import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import db from './server/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'viralvault-secret-key-123';

// Middleware to verify JWT
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware to verify Admin
const authenticateAdmin = (req: any, res: any, next: any) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    next();
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post('/api/auth/register', async (req, res) => {
    const { email, password, country } = req.body;
    try {
      const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();
      
      // Make first user admin for demo purposes, or check specific email
      const role = email === 'admin@viralvault.com' ? 'admin' : 'user';

      db.prepare('INSERT INTO users (id, email, password_hash, country, role) VALUES (?, ?, ?, ?, ?)')
        .run(id, email, hashedPassword, country || 'Unknown', role);

      const token = jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id, email, role, country } });
    } catch (e) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, email: user.email, role: user.role, country: user.country } });
    } catch (e) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

  app.get('/api/auth/me', authenticateToken, (req: any, res) => {
    const user: any = db.prepare('SELECT id, email, role, country FROM users WHERE id = ?').get(req.user.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

  // Subscriber Routes
  app.post('/api/subscribe', (req, res) => {
    const { email, source, country } = req.body;
    try {
      const id = uuidv4();
      db.prepare('INSERT OR IGNORE INTO subscribers (id, email, source, country) VALUES (?, ?, ?, ?)')
        .run(id, email, source || 'unknown', country || 'Unknown');
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Subscription failed' });
    }
  });

  // Favorites Routes
  app.get('/api/favorites', authenticateToken, (req: any, res) => {
    try {
      const favorites = db.prepare(`
        SELECT p.* FROM products p
        JOIN favorites f ON p.id = f.product_id
        WHERE f.user_id = ?
      `).all(req.user.id).map((p: any) => ({
        ...p,
        images: JSON.parse(p.images)
      }));
      res.json(favorites);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch favorites' });
    }
  });

  app.post('/api/favorites/:productId', authenticateToken, (req: any, res) => {
    try {
      db.prepare('INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)')
        .run(req.user.id, req.params.productId);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to add favorite' });
    }
  });

  app.delete('/api/favorites/:productId', authenticateToken, (req: any, res) => {
    try {
      db.prepare('DELETE FROM favorites WHERE user_id = ? AND product_id = ?')
        .run(req.user.id, req.params.productId);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to remove favorite' });
    }
  });

  // API Routes
  app.get('/api/categories', (req, res) => {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json(categories);
  });

  app.get('/api/products', (req, res) => {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM products';
    const params: any[] = [];
    const conditions: string[] = [];

    if (category) {
      conditions.push('category_id = ?');
      params.push(category);
    }
    if (featured === 'true') {
      conditions.push('featured = 1');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY trend_score DESC';

    const products = db.prepare(query).all().map((p: any) => ({
      ...p,
      images: JSON.parse(p.images)
    }));
    res.json(products);
  });

  app.get('/api/products/:id', (req, res) => {
    const product: any = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (product) {
      product.images = JSON.parse(product.images);
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  app.post('/api/track-click', (req, res) => {
    const { productId, platform, country } = req.body;
    try {
      db.prepare('INSERT INTO clicks (product_id, platform, country) VALUES (?, ?, ?)')
        .run(productId, platform, country || 'Unknown');
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to track click' });
    }
  });

  // Admin Routes
  app.post('/api/admin/products', authenticateAdmin, (req, res) => {
    const { id, title, description, category_id, images, amazon_link, aliexpress_link, trend_score, featured } = req.body;
    try {
      db.prepare(`
        INSERT INTO products (id, title, description, category_id, images, amazon_link, aliexpress_link, trend_score, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, title, description, category_id, JSON.stringify(images), amazon_link, aliexpress_link, trend_score || 0, featured ? 1 : 0);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

  app.get('/api/admin/analytics', authenticateAdmin, (req, res) => {
    const clicks = db.prepare('SELECT * FROM clicks ORDER BY timestamp DESC LIMIT 100').all();
    const stats = db.prepare(`
      SELECT platform, COUNT(*) as count 
      FROM clicks 
      GROUP BY platform
    `).all();
    res.json({ clicks, stats });
  });

  app.get('/api/admin/subscribers', authenticateAdmin, (req, res) => {
    try {
      const subscribers = db.prepare('SELECT * FROM subscribers ORDER BY timestamp DESC').all();
      res.json(subscribers);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

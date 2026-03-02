import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'viralvault.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category_id TEXT,
    images TEXT,
    amazon_link TEXT,
    aliexpress_link TEXT,
    trend_score INTEGER DEFAULT 0,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT,
    country TEXT,
    platform TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    country TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    source TEXT,
    country TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS favorites (
    user_id TEXT,
    product_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);

// Insert default categories
const categories = [
  { id: 'tech', name: 'Tech Gadgets' },
  { id: 'kitchen', name: 'Kitchen Essentials' },
  { id: 'phone', name: 'Phone Accessories' },
  { id: 'sport', name: 'Sports & Fitness' },
  { id: 'bike', name: 'Bike Accessories' },
  { id: 'desk', name: 'Desk Setup' },
  { id: 'smart-home', name: 'Smart Home' },
  { id: 'lifestyle', name: 'Lifestyle Products' }
];

const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)');
categories.forEach(c => insertCategory.run(c.id, c.name));

// Insert initial product
const initialProduct = {
  id: 'magnetic-mecha-warrior',
  title: 'Magnetic Mecha Warrior Metal Assembly Figure',
  description: 'A premium, highly detailed magnetic metal assembly figure for your desk setup. Perfect for tech enthusiasts and gadget lovers.',
  category_id: 'desk',
  images: JSON.stringify(['https://picsum.photos/seed/mecha1/800/800', 'https://picsum.photos/seed/mecha2/800/800']),
  amazon_link: 'https://amzn.to/4cGevVw',
  aliexpress_link: 'https://s.click.aliexpress.com/e/_c3OfTIfz',
  trend_score: 99,
  featured: 1
};

const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products (id, title, description, category_id, images, amazon_link, aliexpress_link, trend_score, featured)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
insertProduct.run(
  initialProduct.id,
  initialProduct.title,
  initialProduct.description,
  initialProduct.category_id,
  initialProduct.images,
  initialProduct.amazon_link,
  initialProduct.aliexpress_link,
  initialProduct.trend_score,
  initialProduct.featured
);

export default db;

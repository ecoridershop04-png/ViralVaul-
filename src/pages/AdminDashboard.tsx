import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, BarChart3, Settings, LogOut, Package, Users, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [analytics, setAnalytics] = useState<any>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    category_id: 'tech',
    images: '',
    amazon_link: '',
    aliexpress_link: '',
    trend_score: 50,
    featured: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (activeTab === 'analytics') {
      fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setAnalytics(data))
        .catch(err => console.error(err));
    } else if (activeTab === 'subscribers') {
      fetch('/api/admin/subscribers', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setSubscribers(data))
        .catch(err => console.error(err));
    }
  }, [activeTab, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      ...formData,
      images: formData.images.split(',').map(s => s.trim())
    };

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Product added successfully!');
        setFormData({
          id: '', title: '', description: '', category_id: 'tech', images: '', amazon_link: '', aliexpress_link: '', trend_score: 50, featured: false
        });
      } else {
        alert('Failed to add product');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const exportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Source,Country,Date\n"
      + subscribers.map(s => `${s.email},${s.source},${s.country},${new Date(s.timestamp).toLocaleDateString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-brand-blue/10 text-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package className="w-5 h-5" /> Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-brand-purple/10 text-brand-purple' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BarChart3 className="w-5 h-5" /> Analytics
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
              </div>
              
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Product ID (slug)</label>
                    <input required type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="e.g. magnetic-mecha" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="Product Title" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="Product description..."></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent">
                      <option value="tech">Tech Gadgets</option>
                      <option value="kitchen">Kitchen Essentials</option>
                      <option value="phone">Phone Accessories</option>
                      <option value="sport">Sports & Fitness</option>
                      <option value="bike">Bike Accessories</option>
                      <option value="desk">Desk Setup</option>
                      <option value="smart-home">Smart Home</option>
                      <option value="lifestyle">Lifestyle Products</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Images (Comma separated URLs)</label>
                    <input required type="text" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="https://img1.jpg, https://img2.jpg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Amazon Affiliate Link</label>
                    <input type="url" value={formData.amazon_link} onChange={e => setFormData({...formData, amazon_link: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="https://amzn.to/..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">AliExpress Affiliate Link</label>
                    <input type="url" value={formData.aliexpress_link} onChange={e => setFormData({...formData, aliexpress_link: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" placeholder="https://s.click.aliexpress.com/..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Trend Score (0-100)</label>
                    <input type="number" min="0" max="100" value={formData.trend_score} onChange={e => setFormData({...formData, trend_score: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent" />
                  </div>
                  <div className="space-y-2 flex items-center mt-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue border-gray-300" />
                      <span className="text-sm font-medium text-gray-700">Feature on Homepage</span>
                    </label>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button type="submit" className="bg-brand-blue hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl flex items-center gap-2 transition-colors">
                    <Plus className="w-5 h-5" /> Add Product
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'analytics' && analytics && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Click Analytics</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {analytics.stats.map((stat: any) => (
                  <div key={stat.platform} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{stat.platform} Clicks</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stat.count}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.platform === 'amazon' ? 'bg-gray-100 text-gray-900' : 'bg-red-50 text-red-500'}`}>
                      <BarChart3 className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-900">Recent Clicks</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3">Product ID</th>
                        <th className="px-6 py-3">Platform</th>
                        <th className="px-6 py-3">Country</th>
                        <th className="px-6 py-3">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.clicks.map((click: any) => (
                        <tr key={click.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{click.product_id}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${click.platform === 'amazon' ? 'bg-gray-100 text-gray-800' : 'bg-red-50 text-red-600'}`}>
                              {click.platform}
                            </span>
                          </td>
                          <td className="px-6 py-4">{click.country}</td>
                          <td className="px-6 py-4">{new Date(click.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

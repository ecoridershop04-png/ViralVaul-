import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import Logo from '../components/Logo';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  category_id: string;
  images: string[];
  amazon_link: string;
  aliexpress_link: string;
  trend_score: number;
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category=${categoryId}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryId]);

  const categoryName = categoryId ? categoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Category';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-gray-900 mb-4 capitalize"
          >
            {categoryName}
          </motion.h1>
          <p className="text-gray-500 max-w-2xl">
            Discover the most viral and trending products in {categoryName}. Handpicked for quality and popularity.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter by:</span>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-purple">
              <option>All Products</option>
              <option>Trending Now</option>
              <option>New Arrivals</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Sort by:</span>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-purple">
              <option>Trend Score (High to Low)</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Logo className="w-16 h-16" animated />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Check back later for new viral {categoryName} items.</p>
          </div>
        )}
      </div>
    </div>
  );
}

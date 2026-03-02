import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp } from 'lucide-react';

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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const handleTrackClick = async (platform: string) => {
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          platform,
          country: 'Unknown' // Ideally get from geolocation
        })
      });
    } catch (e) {
      console.error('Failed to track click', e);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden block">
        <img 
          src={product.images[0] || 'https://picsum.photos/seed/placeholder/800/800'} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm text-gray-800 uppercase tracking-wider">
            {product.category_id}
          </span>
          {product.trend_score > 80 && (
            <span className="bg-gradient-brand text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-gray-900 font-medium px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Quick View
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="flex-grow">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-brand-purple transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-6">
            {product.description}
          </p>
        </Link>
        
        <div className="flex flex-col gap-3 mt-auto">
          {product.amazon_link && (
            <a 
              href={product.amazon_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrackClick('amazon')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Buy on Amazon <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {product.aliexpress_link && (
            <a 
              href={product.aliexpress_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrackClick('aliexpress')}
              className="w-full bg-[#ff4747] hover:bg-[#e63e3e] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Buy on AliExpress <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

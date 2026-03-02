import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ExternalLink, TrendingUp, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

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

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [productId]);

  const handleTrackClick = async (platform: string) => {
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product?.id,
          platform,
          country: 'Unknown'
        })
      });
    } catch (e) {
      console.error('Failed to track click', e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Logo className="w-20 h-20" animated />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link to="/" className="text-brand-blue hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to={`/category/${product.category_id}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {product.category_id.replace('-', ' ')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm relative group">
              <img 
                src={product.images[activeImage] || 'https://picsum.photos/seed/placeholder/800/800'} 
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {product.trend_score > 80 && (
                <div className="absolute top-6 left-6 bg-gradient-brand text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Viral Score: {product.trend_score}
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-purple shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span className="text-brand-purple font-semibold text-sm uppercase tracking-wider mb-2 block">
                {product.category_id.replace('-', ' ')}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4" /> Verified Quality
                </span>
                <span className="flex items-center gap-1 text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                  <Truck className="w-4 h-4" /> Fast Shipping Available
                </span>
              </div>
            </div>

            <div className="prose prose-sm sm:prose-base text-gray-600 mb-10">
              <p className="leading-relaxed">{product.description}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 mt-auto">
              {product.amazon_link && (
                <a 
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleTrackClick('amazon')}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  Buy on Amazon <ExternalLink className="w-5 h-5" />
                </a>
              )}
              {product.aliexpress_link && (
                <a 
                  href={product.aliexpress_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleTrackClick('aliexpress')}
                  className="w-full bg-[#ff4747] hover:bg-[#e63e3e] text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  Buy on AliExpress <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                ViralVault is an affiliate partner. We may earn a commission on purchases made through these links at no extra cost to you.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

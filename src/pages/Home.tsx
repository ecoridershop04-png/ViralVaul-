import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Zap, Star, ShieldCheck } from 'lucide-react';

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

const categories = [
  { id: 'tech', name: 'Tech Gadgets', image: 'https://picsum.photos/seed/tech/600/400' },
  { id: 'kitchen', name: 'Kitchen Essentials', image: 'https://picsum.photos/seed/kitchen/600/400' },
  { id: 'phone', name: 'Phone Accessories', image: 'https://picsum.photos/seed/phone/600/400' },
  { id: 'sport', name: 'Sports & Fitness', image: 'https://picsum.photos/seed/sport/600/400' },
  { id: 'bike', name: 'Bike Accessories', image: 'https://picsum.photos/seed/bike/600/400' },
  { id: 'desk', name: 'Desk Setup', image: 'https://picsum.photos/seed/desk/600/400' },
  { id: 'smart-home', name: 'Smart Home', image: 'https://picsum.photos/seed/smarthome/600/400' },
  { id: 'lifestyle', name: 'Lifestyle Products', image: 'https://picsum.photos/seed/lifestyle/600/400' },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:pb-40">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <Logo className="w-32 h-32" animated />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6"
            >
              Discover What's Going <span className="text-gradient">Viral</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg leading-8 text-gray-600 mb-10"
            >
              Your ultimate destination for trending products, viral gadgets, and lifestyle essentials. Handpicked and verified for quality.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-x-6"
            >
              <a href="#trending" className="rounded-full bg-gray-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all hover:scale-105 flex items-center gap-2">
                Shop Trending <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#categories" className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-purple transition-colors">
                Browse Categories <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-gray-100 bg-white/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">Viral Sensations</h3>
              <p className="text-sm text-gray-500 max-w-xs">Products trending right now on TikTok and Instagram.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-brand-purple">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">Curated Quality</h3>
              <p className="text-sm text-gray-500 max-w-xs">Handpicked items with high ratings and real reviews.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900">Trusted Links</h3>
              <p className="text-sm text-gray-500 max-w-xs">Direct links to verified Amazon and AliExpress sellers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Slider */}
      <section id="trending" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Trending Now</h2>
            <Link to="/category/tech" className="text-sm font-semibold text-brand-blue hover:text-brand-purple transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Logo className="w-12 h-12" animated />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Panels */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-12 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/category/${category.id}`}
                  className="group relative block h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                      Explore <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

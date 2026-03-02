import { motion } from 'motion/react';
import Logo from '../components/Logo';
import { Download, Instagram, Youtube, Facebook, LayoutTemplate } from 'lucide-react';

export default function BrandAssets() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-gray-900 mb-4"
          >
            Brand Ecosystem
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Official ViralVault branding assets, templates, and social media guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Logo & Colors */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
              <Logo className="w-20 h-20" animated />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Primary Logo</h3>
            <p className="text-sm text-gray-500 mb-6">Use this logo for all official communications and profile pictures.</p>
            
            <div className="w-full space-y-3 mb-8">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2563eb]"></div>
                  <span className="text-sm font-medium text-gray-700">Brand Blue</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">#2563EB</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#9333ea]"></div>
                  <span className="text-sm font-medium text-gray-700">Brand Purple</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">#9333EA</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ec4899]"></div>
                  <span className="text-sm font-medium text-gray-700">Brand Pink</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">#EC4899</span>
              </div>
            </div>

            <button className="w-full mt-auto bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> Download Assets
            </button>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Typography</h3>
            
            <div className="space-y-8 flex-grow">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Primary Font</p>
                <h4 className="text-3xl font-bold text-gray-900 mb-1 font-sans">Inter</h4>
                <p className="text-sm text-gray-500">Clean, modern, and highly legible for UI and marketing.</p>
              </div>
              
              <div className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Heading 1 (Bold)</span>
                  <span className="text-2xl font-bold text-gray-900">ViralVault</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Heading 2 (Semibold)</span>
                  <span className="text-xl font-semibold text-gray-900">Trending Products</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Body (Regular)</span>
                  <span className="text-base font-normal text-gray-600">Discover what's going viral today.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Templates */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Social Templates</h3>
            
            <div className="space-y-4 flex-grow">
              <div className="p-4 rounded-2xl border border-gray-100 hover:border-brand-purple transition-colors cursor-pointer group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink group-hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instagram Pack</h4>
                    <p className="text-xs text-gray-500">@ViralVault_67</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">Includes profile bio, highlight covers, reel templates, and post styles.</p>
                <span className="text-xs font-medium text-brand-purple flex items-center gap-1">
                  <LayoutTemplate className="w-3 h-3" /> View Templates
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-gray-100 hover:border-brand-blue transition-colors cursor-pointer group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Facebook Page</h4>
                    <p className="text-xs text-gray-500">Banner & Showcase</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-brand-blue flex items-center gap-1">
                  <LayoutTemplate className="w-3 h-3" /> View Templates
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-gray-100 hover:border-red-500 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">YouTube Channel</h4>
                    <p className="text-xs text-gray-500">Banner & Intro/Outro</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <LayoutTemplate className="w-3 h-3" /> View Templates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

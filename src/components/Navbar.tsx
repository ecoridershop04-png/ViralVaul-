import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight text-gradient">ViralVault</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/category/tech" className="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors">Tech</Link>
            <Link to="/category/kitchen" className="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors">Kitchen</Link>
            <Link to="/category/desk" className="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors">Desk Setup</Link>
            <Link to="/brand-assets" className="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors">Brand Assets</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/admin" className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <button className="md:hidden p-2 text-gray-500 hover:text-gray-900">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

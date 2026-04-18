import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/mbti', label: 'MBTI衍生测试' },
    { path: '/resources', label: '心理学资源分享' },
    { path: '/about', label: '关于社团' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Desktop Navigation */}
      <div className="bg-primary/90 backdrop-blur-xl text-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/website_images/logo.png" 
                alt="蓬草心理社" 
                className="w-8 h-8 object-contain rounded"
              />
              <span className="font-semibold text-lg">蓬草心理社</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path
                      ? 'bg-white text-primary font-medium'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-primary/20"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 transform lg:hidden z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-semibold text-lg text-gray-800">菜单</span>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link ${
                  location.pathname === item.path
                    ? 'bg-secondary text-green-800 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

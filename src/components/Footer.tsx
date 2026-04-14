import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-medium">心理社团</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} 心理社团. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-gray-600">
            <a href="#" className="hover:text-primary transition-colors">隐私政策</a>
            <a href="#" className="hover:text-primary transition-colors">联系我们</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

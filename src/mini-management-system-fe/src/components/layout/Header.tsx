import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg w-64 md:w-96">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm nhanh..."
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-gray-600 hover:text-indigo-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <User className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">Quản trị viên</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Ticket, Settings, LogOut, History } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Bảng điều khiển', path: '/' },
    { icon: Users, label: 'Người dùng', path: '/users' },
    { icon: Ticket, label: 'Khuyến mãi', path: '/vouchers' },
    { icon: History, label: 'Lịch sử sử dụng', path: '/voucher-history' },
    { icon: Settings, label: 'Cài đặt', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600">Mini System</h1>
      </div>
      
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t">
        <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors w-full">
          <LogOut className="w-5 h-5 mr-3" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

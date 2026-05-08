import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Ticket, Gift, History, Boxes, UserCircle, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/' },
    { icon: Gift, label: 'Cấp phát Voucher', path: '/voucher-issue' },
    { icon: Ticket, label: 'Quản lý Voucher', path: '/vouchers' },
    { icon: Users, label: 'Quản lý User', path: '/users' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 z-20 shadow-sm">
      <div className="p-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Boxes className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">MMS</h1>
      </div>
      
      <nav className="flex-1 px-4 mt-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-indigo-600' : 'group-hover:text-indigo-600'}`} />
                <span className="text-sm font-semibold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group mb-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-indigo-100 flex items-center justify-center border border-indigo-200 group-hover:border-indigo-400 transition-colors">
            <UserCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Admin User</p>
            <p className="text-[11px] text-gray-500 truncate">Administrator</p>
          </div>
        </div>
        
        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

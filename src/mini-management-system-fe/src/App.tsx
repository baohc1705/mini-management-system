import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import VoucherList from './pages/Vouchers/VoucherList';
import UserList from './pages/Users/UserList';
import VoucherUsageList from './pages/Vouchers/VoucherUsageList';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <div className="flex-1 ml-64">
          <Header />
          
          <main className="p-8">
            <Routes>
              <Route path="/" element={<DashboardDemo />} />
              <Route path="/vouchers" element={<VoucherList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/voucher-history" element={<VoucherUsageList />} />
              <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Settings module coming soon...</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

const DashboardDemo = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">Tổng doanh thu</h3>
      <p className="text-3xl font-bold mt-2">24.560.000 ₫</p>
      <div className="mt-4 text-green-600 text-sm">
        <span>+12.5% so với tháng trước</span>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">Mã đang hoạt động</h3>
      <p className="text-3xl font-bold mt-2">48</p>
      <div className="mt-4 text-indigo-600 text-sm">
        <span>5 mã hết hạn tuần này</span>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">Khách hàng mới</h3>
      <p className="text-3xl font-bold mt-2">156</p>
      <div className="mt-4 text-green-600 text-sm">
        <span>+18% so với tháng trước</span>
      </div>
    </div>
  </div>
);

export default App;

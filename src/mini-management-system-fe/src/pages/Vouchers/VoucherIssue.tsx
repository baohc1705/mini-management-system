import React, { useEffect, useState } from 'react';
import { Gift, User, Ticket, CheckCircle, Search } from 'lucide-react';
import userApi from '../../api/user.api';
import voucherApi from '../../api/voucher.api';
import voucherUsageApi from '../../api/voucher-usage.api';
import type { User as UserType, Voucher } from '../../utils/types';
import Toast from '../../components/common/Toast';
import type { ToastType } from '../../components/common/Toast';
import Pagination from '../../components/common/Pagination';

const VoucherIssue: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [selectedVoucherId, setSelectedVoucherId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [voucherSearch, setVoucherSearch] = useState('');
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(6); // Show 6 vouchers at a time for the grid picker

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const fetchUsers = async () => {
    try {
      const userRes = await userApi.getAll();
      if (userRes.status) setUsers(userRes.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchVouchers = async (currentPage: number, currentSize: number) => {
    try {
      setLoading(true);
      const voucherRes = await voucherApi.getPaginated(currentPage, currentSize);
      if (voucherRes.status) {
        setVouchers(voucherRes.data.items);
        setTotalPages(voucherRes.data.totalPages);
        setTotalItems(voucherRes.data.totalItems);
      }
    } catch (error) {
      console.error('Failed to fetch vouchers', error);
      showToast('Không thể tải voucher', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchVouchers(page, pageSize);
  }, [page, pageSize]);

  const handleUseVoucher = async () => {
    if (!selectedUserId || !selectedVoucherId) {
      showToast('Vui lòng chọn đầy đủ thông tin', 'error');
      return;
    }

    try {
      setSubmitting(true);
      
      const response = await voucherUsageApi.useVoucher({
        userId: Number(selectedUserId),
        voucherId: Number(selectedVoucherId)
      });

      if (response.status) {
        showToast('Sử dụng voucher thành công!');
        setSelectedUserId('');
        setSelectedVoucherId('');
        // Refresh current page
        fetchVouchers(page, pageSize);
      } else {
        showToast(response.message || 'Sử dụng voucher thất bại', 'error');
      }
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Có lỗi xảy ra', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // For simplicity with the existing API, we filter locally on the current page
  const filteredVouchers = vouchers.filter(v => 
    v.code.toLowerCase().includes(voucherSearch.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Gift className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Giao Dịch Cấp Phát Voucher</h1>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-100 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-wider">Hệ thống sẵn sàng</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-600" />
              Người thụ hưởng
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Chọn khách hàng</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(Number(e.target.value))}
                    disabled={loading || submitting}
                    className="block w-full pl-12 pr-10 py-4 text-sm border-2 border-gray-100 rounded-2xl appearance-none focus:outline-none focus:border-indigo-500 bg-gray-50/50 hover:bg-white transition-all font-medium disabled:opacity-50"
                  >
                    <option value="">-- Chọn User --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.fullName}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {selectedUserId && (
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                      {users.find(u => u.id === selectedUserId)?.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{users.find(u => u.id === selectedUserId)?.fullName}</p>
                      <p className="text-xs text-indigo-600">{users.find(u => u.id === selectedUserId)?.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleUseVoucher}
                  disabled={!selectedUserId || !selectedVoucherId || submitting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all disabled:opacity-50 disabled:shadow-none uppercase tracking-widest text-xs"
                >
                  {submitting ? 'Đang xử lý...' : 'Xác nhận cấp phát'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Creative Voucher Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 min-h-[650px] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 flex items-center">
                
                  Kho Voucher
                </h2>
                <p className="text-sm text-gray-400 mt-1 font-medium">Trang {page} / {totalPages}</p>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Lọc trang này..."
                  value={voucherSearch}
                  onChange={(e) => setVoucherSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 text-sm w-full md:w-64 transition-all"
                />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {[1, 2, 4, 6].map(i => (
                  <div key={i} className="h-32 bg-gray-100 rounded-3xl animate-pulse"></div>
                ))}
              </div>
            ) : filteredVouchers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex-1">
                <Ticket className="w-16 h-16 text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">Không có voucher ở trang này</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 content-start">
                {filteredVouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    onClick={() => setSelectedVoucherId(voucher.id)}
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      selectedVoucherId === voucher.id 
                      ? 'scale-[1.02] ring-4 ring-indigo-500/10' 
                      : 'hover:scale-[1.01]'
                    }`}
                  >
                    {/* Ticket Design */}
                    <div className={`relative flex h-36 rounded-3xl overflow-hidden border-2 transition-all ${
                      selectedVoucherId === voucher.id 
                      ? 'bg-indigo-600 border-indigo-600' 
                      : 'bg-white border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-md'
                    }`}>
                      {/* Left: Discount Side */}
                      <div className={`w-24 flex flex-col items-center justify-center border-r-2 border-dashed ${
                        selectedVoucherId === voucher.id ? 'border-white/20 text-white' : 'border-gray-100 bg-indigo-50 text-indigo-600'
                      }`}>
                        <span className="text-2xl font-black">{voucher.discountPercent}%</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Giảm giá</span>
                      </div>
                      
                      {/* Right: Content Side */}
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className={`text-lg font-black tracking-tight ${selectedVoucherId === voucher.id ? 'text-white' : 'text-gray-900'}`}>
                              {voucher.code}
                            </h3>
                            {selectedVoucherId === voucher.id && (
                              <CheckCircle className="w-5 h-5 text-white animate-in zoom-in duration-300" />
                            )}
                          </div>
                          <p className={`text-[10px] font-bold mt-1 uppercase ${selectedVoucherId === voucher.id ? 'text-indigo-200' : 'text-gray-400'}`}>
                            Hết hạn: {new Date(voucher.expiredDate).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                            selectedVoucherId === voucher.id ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <Ticket className="w-3 h-3" />
                            <span className="text-[11px] font-bold">Còn {voucher.quantity}</span>
                          </div>
                          {voucher.quantity < 10 && (
                            <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg">SẮP HẾT</span>
                          )}
                        </div>
                      </div>

                      {/* Ticket Cut-outs */}
                      <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
                      <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
                      <div className="absolute top-1/2 left-[5.5rem] -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-transparent"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-auto border-t border-gray-100 pt-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default VoucherIssue;

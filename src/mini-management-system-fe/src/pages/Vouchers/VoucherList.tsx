import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import voucherApi from '../../api/voucher.api';
import voucherUsageApi from '../../api/voucher-usage.api';
import type { Voucher } from '../../utils/types';
import Modal from '../../components/common/Modal';
import VoucherForm from './VoucherForm';
import UseVoucherModal from './UseVoucherModal';
import Toast from '../../components/common/Toast';
import type { ToastType } from '../../components/common/Toast';
import ConfirmModal from '../../components/common/ConfirmModal';

const VoucherList: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUseModalOpen, setIsUseModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [voucherToDelete, setVoucherToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const apiResponse = await voucherApi.getPaginated(page, size);
      if (apiResponse.status) {
        setVouchers(apiResponse.data.items);
        setTotalPages(apiResponse.data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch vouchers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [page]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) {
      fetchVouchers();
      return;
    }
    try {
      setLoading(true);
      const apiResponse = await voucherApi.searchByCode(searchTerm);
      if (apiResponse.status) {
        setVouchers(apiResponse.data ? [apiResponse.data] : []);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Search failed', error);
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setVoucherToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!voucherToDelete) return;
    try {
      await voucherApi.delete(voucherToDelete);
      showToast('Xóa mã giảm giá thành công!');
      fetchVouchers();
    } catch (error) {
      console.error('Delete failed', error);
      showToast('Xóa mã giảm giá thất bại!', 'error');
    } finally {
      setVoucherToDelete(null);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingVoucher) {
        await voucherApi.update(editingVoucher.id, { ...data, id: editingVoucher.id, status: editingVoucher.status });
        showToast('Cập nhật mã giảm giá thành công!');
      } else {
        await voucherApi.create(data);
        showToast('Tạo mã giảm giá mới thành công!');
      }
      setIsModalOpen(false);
      setEditingVoucher(null);
      fetchVouchers();
    } catch (error) {
      console.error('Save failed', error);
      showToast('Lưu thông tin thất bại!', 'error');
    }
  };

  const openCreateModal = () => {
    setEditingVoucher(null);
    setIsModalOpen(true);
  };

  const handleUseVoucher = async (userId: number) => {
    if (!selectedVoucher) return;
    try {
      const response = await voucherUsageApi.useVoucher({
        userId,
        voucherId: selectedVoucher.id
      });
      if (response.status) {
        showToast('Sử dụng mã giảm giá thành công!');
        setIsUseModalOpen(false);
        fetchVouchers();
      }
    } catch (error: any) {
      console.error('Use voucher failed', error);
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi sử dụng mã.';
      showToast(message, 'error');
    }
  };

  const openUseModal = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsUseModalOpen(true);
  };

  const openEditModal = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900">Danh sách mã giảm giá</h2>
          
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm theo mã..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64 text-[13px]"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </form>
            
            <button
              onClick={openCreateModal}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-[13px] font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm mã mới
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-gray-200 text-gray-900 font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Mã</th>
              <th className="px-6 py-4">Mức giảm</th>
              <th className="px-6 py-4">Số lượng</th>
              <th className="px-6 py-4">Ngày hết hạn</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-900">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center">Đang tải...</td>
              </tr>
            ) : vouchers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center">Không tìm thấy mã giảm giá nào</td>
              </tr>
            ) : (
              vouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{voucher.code}</td>
                  <td className="px-6 py-4 text-gray-900">{(voucher.discountPercent ?? 0)}%</td>
                  <td className="px-6 py-4 text-gray-900">{(voucher.quantity ?? 0)}</td>
                  <td className="px-6 py-4 text-gray-900">{voucher.expiredDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${
                      voucher.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                      voucher.status === 'EXPIRED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {voucher.status === 'ACTIVE' ? 'HOẠT ĐỘNG' : 
                       voucher.status === 'EXPIRED' ? 'HẾT HẠN' : 'KHÔNG HOẠT ĐỘNG'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => openUseModal(voucher)}
                        title="Sử dụng mã"
                        className="text-gray-900 hover:text-green-600 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(voucher)}
                        className="text-gray-900 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(voucher.id)}
                        className="text-gray-900 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-6 pb-6">
          <p className="text-sm text-gray-500">
            Hiển thị trang {page} trên {totalPages}
          </p>
          <div className="flex items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVoucher ? 'Cập nhật mã giảm giá' : 'Tạo mã giảm giá mới'}
      >
        <VoucherForm
          onSubmit={handleFormSubmit}
          initialData={editingVoucher}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <UseVoucherModal
        isOpen={isUseModalOpen}
        onClose={() => setIsUseModalOpen(false)}
        voucher={selectedVoucher}
        onConfirm={handleUseVoucher}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa mã giảm giá này không? Hành động này không thể hoàn tác."
      />

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

export default VoucherList;

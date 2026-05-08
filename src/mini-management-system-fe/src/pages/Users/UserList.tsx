import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import userApi from '../../api/user.api';
import type { User } from '../../utils/types';
import Modal from '../../components/common/Modal';
import UserForm from './UserForm';
import Toast from '../../components/common/Toast';
import type { ToastType } from '../../components/common/Toast';
import ConfirmModal from '../../components/common/ConfirmModal';
import Pagination from '../../components/common/Pagination';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const apiResponse = await userApi.getPaginated(page, size);
      if (apiResponse.status) {
        setUsers(apiResponse.data.items);
        setTotalPages(apiResponse.data.totalPages);
        setTotalItems(apiResponse.data.totalItems);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size]);

  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await userApi.delete(userToDelete);
      showToast('Xóa người dùng thành công!');
      fetchUsers();
    } catch (error) {
      console.error('Delete failed', error);
      showToast('Xóa người dùng thất bại!', 'error');
    } finally {
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingUser) {
        await userApi.update(editingUser.id, { ...data, id: editingUser.id });
        showToast('Cập nhật người dùng thành công!');
      } else {
        await userApi.create(data);
        showToast('Tạo người dùng mới thành công!');
      }
      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Save failed', error);
      showToast('Lưu thông tin thất bại! Email có thể đã tồn tại.', 'error');
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900">Danh sách người dùng</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64 text-[13px] text-gray-900"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <button
              onClick={openCreateModal}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-[13px] font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm người dùng mới
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-gray-200 text-gray-900 font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Họ và tên</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Số điện thoại</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-900">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center">Đang tải...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center">Không tìm thấy người dùng nào</td>
              </tr>
            ) : (
              users
                .filter(user => 
                  user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{user.fullName}</td>
                  <td className="px-6 py-4 text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 text-gray-900">{user.phone}</td>
                  <td className="px-6 py-4 text-gray-900">{user.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-3">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-gray-900 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
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
      <div className="flex items-center p-6 border-t border-gray-100">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={size}
          onPageChange={setPage}
          onPageSizeChange={setSize}
          loading={loading}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}
      >
        <UserForm
          onSubmit={handleFormSubmit}
          initialData={editingUser}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa người dùng này không? Hành động này không thể hoàn tác."
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

export default UserList;

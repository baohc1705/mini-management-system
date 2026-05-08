import React, { useEffect, useState } from 'react';
import userApi from '../../api/user.api';
import type { User, Voucher } from '../../utils/types';
import Modal from '../../components/common/Modal';

interface UseVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: Voucher | null;
  onConfirm: (userId: number) => void;
}

const UseVoucherModal: React.FC<UseVoucherModalProps> = ({ isOpen, onClose, voucher, onConfirm }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await userApi.getAll();
          if (response.status) {
            setUsers(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch users', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedUserId) {
      onConfirm(Number(selectedUserId));
    }
  };

  if (!voucher) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Sử dụng mã: ${voucher.code}`}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Chọn người dùng sẽ sử dụng mã giảm giá này. 
          Lưu ý: Số lượng mã sẽ giảm đi 1 sau khi xác nhận.
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Người dùng</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2 text-[13px] text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          >
            <option value="">-- Chọn người dùng --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName} ({user.email})
              </option>
            ))}
          </select>
          {loading && <p className="text-xs text-gray-500 mt-1">Đang tải danh sách người dùng...</p>}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 text-[13px]"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedUserId}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-[13px]"
          >
            Xác nhận sử dụng
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UseVoucherModal;

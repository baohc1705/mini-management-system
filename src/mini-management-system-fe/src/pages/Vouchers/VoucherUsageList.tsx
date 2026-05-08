import React, { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import voucherUsageApi from '../../api/voucher-usage.api';
import type { VoucherUsage } from '../../utils/types';
import Pagination from '../../components/common/Pagination';

const VoucherUsageList: React.FC = () => {
  const [usages, setUsages] = useState<VoucherUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUsages = async () => {
    try {
      setLoading(true);
      const apiResponse = await voucherUsageApi.getPaginated(page, size);
      if (apiResponse.status) {
        setUsages(apiResponse.data.items);
        setTotalPages(apiResponse.data.totalPages);
        setTotalItems(apiResponse.data.totalItems);
      }
    } catch (error) {
      console.error('Failed to fetch voucher usages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsages();
  }, [page, size]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <History className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Lịch sử sử dụng Voucher</h2>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-gray-200 text-gray-900 font-bold uppercase tracking-wider">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Mã Voucher</th>
              <th className="px-6 py-4">Người sử dụng</th>
              <th className="px-6 py-4">Thời gian sử dụng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-900">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">Đang tải...</td>
              </tr>
            ) : usages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">Chưa có lịch sử sử dụng nào</td>
              </tr>
            ) : (
              usages.map((usage) => (
                <tr key={usage.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">#{usage.id}</td>
                  <td className="px-6 py-4 font-bold text-indigo-600">{usage.voucherCode}</td>
                  <td className="px-6 py-4 text-gray-900">{usage.userFullName}</td>
                  <td className="px-6 py-4 text-gray-900">{usage.usedAt}</td>
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
    </div>
  );
};

export default VoucherUsageList;

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Voucher } from '../../utils/types';

const voucherSchema = z.object({
  code: z.string().min(1, 'Mã không được để trống').max(50, 'Mã không được quá 50 ký tự'),
  discountPercent: z.number().min(1, 'Mức giảm tối thiểu là 1%').max(100, 'Mức giảm tối đa là 100%'),
  quantity: z.number().min(0, 'Số lượng không được nhỏ hơn 0'),
  expiredDate: z.string().min(1, 'Ngày hết hạn là bắt buộc'),
});

type VoucherFormData = z.infer<typeof voucherSchema>;

interface VoucherFormProps {
  onSubmit: (data: VoucherFormData) => void;
  initialData?: Voucher | null;
  onCancel: () => void;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VoucherFormData>({
    resolver: zodResolver(voucherSchema),
    defaultValues: initialData ? {
      code: initialData.code,
      discountPercent: initialData.discountPercent,
      quantity: initialData.quantity,
      expiredDate: initialData.expiredDate,
    } : {
      code: '',
      discountPercent: 0,
      quantity: 0,
      expiredDate: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Mã giảm giá</label>
        <input
          {...register('code')}
          className={`mt-1 block w-full border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-[13px] text-gray-900`}
          placeholder="VD: KHUYENMAI2024"
        />
        {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phần trăm giảm (%)</label>
        <input
          type="number"
          {...register('discountPercent', { valueAsNumber: true })}
          className={`mt-1 block w-full border ${errors.discountPercent ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-[13px] text-gray-900`}
        />
        {errors.discountPercent && <p className="mt-1 text-xs text-red-500">{errors.discountPercent.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Số lượng</label>
        <input
          type="number"
          {...register('quantity', { valueAsNumber: true })}
          className={`mt-1 block w-full border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-[13px] text-gray-900`}
        />
        {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ngày hết hạn</label>
        <input
          type="date"
          {...register('expiredDate')}
          className={`mt-1 block w-full border ${errors.expiredDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-[13px] text-gray-900`}
        />
        {errors.expiredDate && <p className="mt-1 text-xs text-red-500">{errors.expiredDate.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 mt-6 text-[13px]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 text-[13px]"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-medium text-white hover:bg-indigo-700 text-[13px]"
        >
          {initialData ? 'Cập nhật' : 'Tạo mới'}
        </button>
      </div>
    </form>
  );
};

export default VoucherForm;

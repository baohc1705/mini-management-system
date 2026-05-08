import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { User } from '../../utils/types';

const userSchema = z.object({
  fullName: z.string().min(1, 'Họ tên không được để trống').max(100, 'Họ tên không được quá 100 ký tự'),
  email: z.string().min(1, 'Email không được để trống').email('Email không đúng định dạng'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số').max(11, 'Số điện thoại không quá 11 số'),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: User | null;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData ? {
      fullName: initialData.fullName,
      email: initialData.email,
      phone: initialData.phone,
    } : {
      fullName: '',
      email: '',
      phone: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
        <input
          {...register('fullName')}
          className={`mt-1 block w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-[13px] text-gray-900`}
          placeholder="VD: Nguyễn Văn A"
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-[13px] text-gray-900`}
          placeholder="example@gmail.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
        <input
          {...register('phone')}
          className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-[13px] text-gray-900`}
          placeholder="0912345678"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 text-[13px]"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 text-[13px]"
        >
          {initialData ? 'Cập nhật' : 'Tạo mới'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;

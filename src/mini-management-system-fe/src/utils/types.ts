export interface ApiResponse<T> {
  message: string;
  data: T;
  status: string;
}

export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export const VoucherStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED'
} as const;

export type VoucherStatus = (typeof VoucherStatus)[keyof typeof VoucherStatus];

export interface Voucher {
  id: number;
  code: string;
  discountPercent: number;
  quantity: number;
  expiredDate: string;
  status: VoucherStatus;
  createdAt: string;
}

export interface CreateVoucherRequest {
  code: string;
  discountPercent: number;
  quantity: number;
  expiredDate: string;
}

export interface UpdateVoucherRequest extends CreateVoucherRequest {
  id: number;
  status: VoucherStatus;
}
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  phone: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}

export interface VoucherUsage {
  id: number;
  usedAt: string;
  userId: number;
  userFullName: string;
  voucherId: number;
  voucherCode: string;
}

export interface UseVoucherRequest {
  userId: number;
  voucherId: number;
}

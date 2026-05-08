import axiosClient from './axios-client';
import type { ApiResponse, PageResponse, Voucher, CreateVoucherRequest, UpdateVoucherRequest } from '../utils/types';

const voucherApi = {
  getAll: (): Promise<ApiResponse<Voucher[]>> => {
    return axiosClient.get('/vouchers');
  },

  getPaginated: (page: number, size: number): Promise<ApiResponse<PageResponse<Voucher>>> => {
    return axiosClient.get('/vouchers/page', {
      params: { page, size }
    });
  },

  create: (data: CreateVoucherRequest): Promise<ApiResponse<Voucher>> => {
    return axiosClient.post('/vouchers', data);
  },

  update: (id: number, data: UpdateVoucherRequest): Promise<ApiResponse<string>> => {
    return axiosClient.put(`/vouchers/${id}`, data);
  },

  delete: (id: number): Promise<ApiResponse<string>> => {
    return axiosClient.delete(`/vouchers/${id}`);
  },

  searchByCode: (code: string): Promise<ApiResponse<Voucher>> => {
    return axiosClient.get('/vouchers/search', {
      params: { code }
    });
  }
};

export default voucherApi;

import axiosClient from './axios-client';
import type { ApiResponse, PageResponse, VoucherUsage, UseVoucherRequest } from '../utils/types';

const voucherUsageApi = {
  useVoucher: (data: UseVoucherRequest): Promise<ApiResponse<VoucherUsage>> => {
    return axiosClient.post('/voucher-usages/use', data);
  },

  getAll: (): Promise<ApiResponse<VoucherUsage[]>> => {
    return axiosClient.get('/voucher-usages');
  },

  getPaginated: (page: number, size: number): Promise<ApiResponse<PageResponse<VoucherUsage>>> => {
    return axiosClient.get('/voucher-usages/page', {
      params: { page, size }
    });
  }
};

export default voucherUsageApi;

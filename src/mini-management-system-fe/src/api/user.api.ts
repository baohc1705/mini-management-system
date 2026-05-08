import axiosClient from './axios-client';
import type { ApiResponse, PageResponse, User, CreateUserRequest, UpdateUserRequest } from '../utils/types';

const userApi = {
  getAll: (): Promise<ApiResponse<User[]>> => {
    return axiosClient.get('/users');
  },

  getPaginated: (page: number, size: number): Promise<ApiResponse<PageResponse<User>>> => {
    return axiosClient.get('/users/page', {
      params: { page, size }
    });
  },

  getById: (id: number): Promise<ApiResponse<User>> => {
    return axiosClient.get(`/users/${id}`);
  },

  create: (data: CreateUserRequest): Promise<ApiResponse<User>> => {
    return axiosClient.post('/users', data);
  },

  update: (id: number, data: UpdateUserRequest): Promise<ApiResponse<string>> => {
    return axiosClient.put(`/users/${id}`, data);
  },

  delete: (id: number): Promise<ApiResponse<string>> => {
    return axiosClient.delete(`/users/${id}`);
  }
};

export default userApi;

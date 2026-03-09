import axios, {AxiosInstance, AxiosError} from 'axios';
import { Order, Branch, ApiResponse } from '@/types';

// Create axios instance with types
const api: AxiosInstance = axios.create({
    baseURL: '/api', // Proxy to Spring Boot backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Typed API functions
export const orderApi = {
    getAll: async (): Promise<Order[]> => {
        const response = await api.get<Order[]>('/orders');
        return response.data;
    },
    getById: async (id: number): Promise<Order> => {
        const response = await api.get<Order>(`/orders/${id}`);
        return response.data;
    },
    create: async (order: Partial<Order>): Promise<Order> => {
        const response = await api.post<Order>('/orders', order);
        return response.data;
    },
    updateStatus: async (id: number, status: Order['status']): Promise<Order> => {
        const response = await api.patch<Order>(`/orders/${id}/status`, {status});
        return response.data;
    },
};

export const branchApi = {
    getAll: async (): Promise<Branch[]> => {
        const response = await api.get<Branch[]>('/branches/');
        return response.data;
    },
    getById: async (id: number): Promise<Branch> => {
        const response = await api.get<Branch>(`/branches/${id}`);
        return response.data;
    }
};

export default api;
// Types that match your Spring Boot backend

export interface Order {
  id: number;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED';
  branchId: number;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: 'OPEN' | 'CLOSED' | 'BUSY';
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
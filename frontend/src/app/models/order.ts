import { CartItem } from './product';

export interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDate: Date;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'telegram' | 'chapa' | 'cbe';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  transactionId?: string;
  receiptUrl?: string;
  sessionId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface OrderStatusUpdate {
  orderId: string;
  status: Order['orderStatus'];
}

export interface PaymentConfirmation {
  orderId: string;
  transactionId: string;
  paymentMethod: string;
  amount: number;
  receiptFile?: File;
}
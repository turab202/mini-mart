export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  stock: number;
  rating: number;
  reviews?: Review[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  _id: string;
  user?: string;
  sessionId: string;
  items: CartItem[];
  updatedAt: Date;
}
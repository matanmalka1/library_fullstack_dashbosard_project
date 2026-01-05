
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  description: string;
  coverImage: string;
  stockQuantity: number;
  categories: string[];
  publisher: string;
  publicationDate: string;
  rating: number;
  reviews: Review[];
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  date: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

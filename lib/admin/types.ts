// Field names mirror the existing backend exactly (never renamed) so these
// types can be dropped in wherever the real API response shapes are confirmed.

export type LoadState<T> =
  | { status: "loading"; data: null; message?: undefined }
  | { status: "error"; data: null; message: string }
  | { status: "success"; data: T; message?: undefined };

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type OrderStatus = "CONFIRMED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";

export interface OrderTimelineEntry {
  status: string;
  createdAt: string;
  note?: string;
}

export interface OrderItemSize {
  id: string;
  name: string;
}

export interface OrderItemAddon {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  menuItem: { id: string; name: string };
  images?: string[];
  size?: OrderItemSize | null;
  addons?: OrderItemAddon[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderCoupon {
  id: string;
  code: string;
  discountAmount?: number;
}

export interface OrderAddress {
  id: string;
  label?: string;
  street: string;
  city?: string;
  notes?: string;
}

export interface OrderCustomer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus | string;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  taxAmount: number;
  totalAmount: number;
  estimatedTime?: string | null;
  guestName?: string | null;
  guestPhone?: string | null;
  guestAddress?: string | null;
  address?: OrderAddress | null;
  items: OrderItem[];
  timeline: OrderTimelineEntry[];
  coupon?: OrderCoupon | null;
  customer?: OrderCustomer | null;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  isGuest: boolean;
  totalOrders: number;
  totalSpent: number;
  lastOrderAt?: string | null;
}

export type ReservationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  partySize: number;
  date: string;
  time: string;
  status: ReservationStatus | string;
  notes?: string | null;
  createdAt: string;
}

export interface DashboardStats {
  todayRevenue: number;
  todayOrders: number;
  pendingOrders: number;
  preparingOrders: number;
  deliveredToday: number;
  totalCustomers: number;
  reservationsToday: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
}

export interface TopSellingItem {
  id: string;
  name: string;
  unitsSold: number;
  revenue: number;
  image?: string;
}

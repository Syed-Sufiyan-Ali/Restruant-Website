import { adminApi } from "./api";
import type { Order, PaginatedResult } from "./types";

export interface OrdersQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

function buildQueryString(query: OrdersQuery): string {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Existing endpoint: GET /api/orders/route.ts
 * TODO: confirm the exact query param names (page/pageSize/search/status/
 * sortBy/sortDir) and the list response shape (PaginatedResult<Order>) match
 * what this route actually returns.
 */
export function fetchOrders(query: OrdersQuery = {}) {
  return adminApi.get<PaginatedResult<Order>>(`/api/orders${buildQueryString(query)}`);
}

/** Existing endpoint: GET /api/orders/[id]/route.ts */
export function fetchOrder(id: string) {
  return adminApi.get<Order>(`/api/admin/orders/${id}`);
}

/**
 * TODO: Requires backend endpoint. Confirm whether status updates go through
 * PATCH /api/orders/[id] with a { status } body, or a dedicated
 * PATCH /api/orders/[id]/status route. Using the dedicated route as the
 * default guess — update the path below if the real one differs.
 */
export function updateOrderStatus(id: string, status: string) {
  return adminApi.patch<Order>(`/api/admin/orders/${id}/status`, {
    status,
  });
}
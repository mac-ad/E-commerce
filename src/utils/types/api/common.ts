export type ItemType = "all" | "active" | "inactive"
export type UserType = "admin" | "user"
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"
export type PaymentStatus = "pending" | "completed" | "failed"

export enum OrderStatusEnum {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

export enum PaymentStatusEnum {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed"
}


// ["pending", "processing", "shipped", "delivered", "cancelled"]
export const OrderStatusEnumArray = Array.from(Object.values(OrderStatusEnum))

// ["pending", "completed", "failed"] 
export const PaymentStatusEnumArray = Array.from(Object.values(PaymentStatusEnum))

export enum UserRoleEnum {
  ADMIN = "admin",
  USER = "user"
}

// ["admin", "user"]
export const UserRoleEnumArray = Array.from(Object.values(UserRoleEnum))
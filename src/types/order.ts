export enum OrderType {
  EATIN = "EAT_IN",
  TAKE_AWAY = "TAKE_AWAY",
  DELIVERY = "DELIVERY",
}

export enum DeliveryMode {
  STANDARD_DELIVERY = "STANDARD_DELIVERY",
  EXPRESS_DELIVERY = "EXPRESS_DELIVERY",
  PRE_DELIVERY = "PRE_DELIVERY",
}

export enum OrderStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  PAID = "PAID",
  DELIVERING = "DELIVERING",
  DELIVERED = "DELIVERED",
}
export enum PaymentType {
  CASH = "CASH",
  BANKING = "BANKING",
  POINTIFY = "POINTIFY",
}
export enum PaymentStatus {
  PENDING = "PENDING",
  FAIL = "FAIL",
  PAID = "PAID",
}

export interface Order {
  type: string;
  name: string;
}

export interface orderStatusCart {
  status: OrderStatus;
  paymentType: string;
  guestNumber: number;
  deliStatus: string;
}

export interface OrderPreview {
  id: string;
  invoiceId: string;
  staffName: string;
  startDate: string;
  endDate: string;
  finalAmount: number;
  orderType: string;
  status: string;
  paymentType: string;
  paymentStatus: string;
  customerName: string;
  phone: string;
  address: string;
  storeName: string;
  storePic: string;
}

export interface OrderDetails {
  notes: String;
  orderId: string;
  invoiceId: string;
  storeName: string;
  totalAmount: number;
  finalAmount: number;
  vat: number;
  vatAmount: number;
  discount: number;
  orderStatus: string;
  orderType: string;
  paymentType: string;
  checkInDate: string;
  customerNumber: number;
  promotionList: PromotionList[];
  productList: ProductList[];
  customerInfo: CustomerInfo;
}

export interface PromotionList {
  promotionId: string;
  promotionName: string;
  discountAmount: number;
  quantity: number;
  effectType: string;
}

export interface ProductList {
  picUrl: string;
  productInMenuId: string;
  orderDetailId: string;
  sellingPrice: number;
  quantity: number;
  name: string;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  note: string;
  extras: Extra[];
}

export interface Extra {
  productInMenuId: string;
  sellingPrice: number;
  quantity: number;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  name: string;
}

export interface CustomerInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  customerType: string;
  deliTime: string;
  paymentStatus: string;
  deliStatus: string;
}

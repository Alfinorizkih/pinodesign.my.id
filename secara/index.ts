
// Service types
export type ServiceType = 'PULSA' | 'DATA' | 'GAME' | 'EWALLET' | 'ELECTRICITY' | 'PREMIUM_APP';

export type ServiceCategory = {
  id: string;
  name: string;
  type: ServiceType;
  icon: string;
  description: string;
  isAutomatic: boolean;
};

export type ServiceProduct = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  isAvailable: boolean;
  stock?: number;
};

// Transaction types
export type PaymentMethod = 'BANK_TRANSFER' | 'EWALLET' | 'QRIS';

export type PaymentProvider = {
  id: string;
  name: string;
  type: PaymentMethod;
  logo: string;
  isAvailable: boolean;
};

export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export type Transaction = {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentProvider: string;
  status: TransactionStatus;
  referenceNumber?: string;
  targetNumber: string;
  createdAt: Date;
  updatedAt: Date;
  processingTime?: Date;
  completionTime?: Date;
};

// User data
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
};

// Notification types
export type NotificationType = 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
};

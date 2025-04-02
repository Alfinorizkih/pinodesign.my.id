
import { ServiceCategory, ServiceProduct, PaymentProvider } from '@/types';

// Define service categories
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'pulsa',
    name: 'Pulsa',
    type: 'PULSA',
    icon: 'smartphone',
    description: 'Isi ulang pulsa semua operator dengan cepat dan otomatis',
    isAutomatic: true,
  },
  {
    id: 'data',
    name: 'Paket Data',
    type: 'DATA',
    icon: 'wifi',
    description: 'Paket data internet dengan harga terbaik',
    isAutomatic: true,
  },
  {
    id: 'game',
    name: 'Voucher Game',
    type: 'GAME',
    icon: 'gamepad-2',
    description: 'Top up voucher game tanpa perlu menunggu',
    isAutomatic: true,
  },
  {
    id: 'ewallet',
    name: 'E-Wallet',
    type: 'EWALLET',
    icon: 'wallet',
    description: 'Isi saldo e-wallet dengan cepat dan aman',
    isAutomatic: true,
  },
  {
    id: 'electricity',
    name: 'Listrik PLN',
    type: 'ELECTRICITY',
    icon: 'zap',
    description: 'Bayar tagihan listrik atau token PLN',
    isAutomatic: true,
  },
  {
    id: 'premium-app',
    name: 'Aplikasi Premium',
    type: 'PREMIUM_APP',
    icon: 'award',
    description: 'Beli aplikasi premium dengan harga terbaik',
    isAutomatic: false,
  },
];

// Define products for each category (simplified examples)
export const serviceProducts: ServiceProduct[] = [
  // Pulsa products
  {
    id: 'pulsa-5k',
    categoryId: 'pulsa',
    name: 'Pulsa 5,000',
    description: 'Pulsa senilai Rp5.000',
    price: 6000,
    isAvailable: true,
  },
  {
    id: 'pulsa-10k',
    categoryId: 'pulsa',
    name: 'Pulsa 10,000',
    description: 'Pulsa senilai Rp10.000',
    price: 11000,
    isAvailable: true,
  },
  {
    id: 'pulsa-20k',
    categoryId: 'pulsa',
    name: 'Pulsa 20,000',
    description: 'Pulsa senilai Rp20.000',
    price: 21000,
    isAvailable: true,
  },
  {
    id: 'pulsa-50k',
    categoryId: 'pulsa',
    name: 'Pulsa 50,000',
    description: 'Pulsa senilai Rp50.000',
    price: 50500,
    isAvailable: true,
  },
  {
    id: 'pulsa-100k',
    categoryId: 'pulsa',
    name: 'Pulsa 100,000',
    description: 'Pulsa senilai Rp100.000',
    price: 99000,
    discount: 1000,
    isAvailable: true,
  },

  // Data packages
  {
    id: 'data-5gb',
    categoryId: 'data',
    name: 'Paket Data 5GB',
    description: 'Paket data 5GB berlaku 30 hari',
    price: 50000,
    isAvailable: true,
  },
  {
    id: 'data-10gb',
    categoryId: 'data',
    name: 'Paket Data 10GB',
    description: 'Paket data 10GB berlaku 30 hari',
    price: 80000,
    isAvailable: true,
  },
  
  // Game vouchers
  {
    id: 'game-ml-50',
    categoryId: 'game',
    name: 'Mobile Legends 50 Diamonds',
    description: '50 Diamonds untuk Mobile Legends',
    price: 15000,
    isAvailable: true,
  },
  {
    id: 'game-ml-100',
    categoryId: 'game',
    name: 'Mobile Legends 100 Diamonds',
    description: '100 Diamonds untuk Mobile Legends',
    price: 30000,
    isAvailable: true,
  },
  
  // E-Wallet
  {
    id: 'ewallet-gopay-50k',
    categoryId: 'ewallet',
    name: 'GoPay 50,000',
    description: 'Top up GoPay Rp50.000',
    price: 51000,
    isAvailable: true,
  },
  {
    id: 'ewallet-dana-100k',
    categoryId: 'ewallet',
    name: 'DANA 100,000',
    description: 'Top up DANA Rp100.000',
    price: 101000,
    isAvailable: true,
  },
  
  // Electricity
  {
    id: 'pln-token-50k',
    categoryId: 'electricity',
    name: 'Token PLN 50,000',
    description: 'Token listrik PLN Rp50.000',
    price: 51000,
    isAvailable: true,
  },
  {
    id: 'pln-token-100k',
    categoryId: 'electricity',
    name: 'Token PLN 100,000',
    description: 'Token listrik PLN Rp100.000',
    price: 101000,
    isAvailable: true,
  },
  
  // Premium Apps
  {
    id: 'premium-netflix',
    categoryId: 'premium-app',
    name: 'Netflix Premium 1 Bulan',
    description: 'Akun Netflix Premium berlaku 1 bulan',
    price: 60000,
    isAvailable: true,
    stock: 15,
  },
  {
    id: 'premium-spotify',
    categoryId: 'premium-app',
    name: 'Spotify Premium 1 Bulan',
    description: 'Akun Spotify Premium berlaku 1 bulan',
    price: 25000,
    isAvailable: true,
    stock: 8,
  },
  {
    id: 'premium-youtube',
    categoryId: 'premium-app',
    name: 'YouTube Premium 1 Bulan',
    description: 'Akun YouTube Premium berlaku 1 bulan',
    price: 30000,
    isAvailable: true,
    stock: 10,
  },
];

// Define payment providers
export const paymentProviders: PaymentProvider[] = [
  // Bank Transfer
  {
    id: 'bca',
    name: 'BCA',
    type: 'BANK_TRANSFER',
    logo: 'landmark',
    isAvailable: true,
  },
  {
    id: 'bni',
    name: 'BNI',
    type: 'BANK_TRANSFER',
    logo: 'landmark',
    isAvailable: true,
  },
  {
    id: 'mandiri',
    name: 'Mandiri',
    type: 'BANK_TRANSFER',
    logo: 'landmark',
    isAvailable: true,
  },
  
  // E-Wallet
  {
    id: 'gopay',
    name: 'GoPay',
    type: 'EWALLET',
    logo: 'wallet',
    isAvailable: true,
  },
  {
    id: 'dana',
    name: 'DANA',
    type: 'EWALLET',
    logo: 'wallet',
    isAvailable: true,
  },
  {
    id: 'ovo',
    name: 'OVO',
    type: 'EWALLET',
    logo: 'wallet',
    isAvailable: true,
  },
  
  // QRIS
  {
    id: 'qris',
    name: 'QRIS',
    type: 'QRIS',
    logo: 'qr-code',
    isAvailable: true,
  },
];

// Mock function to get products by category
export const getProductsByCategory = (categoryId: string): ServiceProduct[] => {
  return serviceProducts.filter(product => product.categoryId === categoryId && product.isAvailable);
};

// Mock function to get a product by ID
export const getProductById = (productId: string): ServiceProduct | undefined => {
  return serviceProducts.find(product => product.id === productId);
};

// Mock function to get a category by ID
export const getCategoryById = (categoryId: string): ServiceCategory | undefined => {
  return serviceCategories.find(category => category.id === categoryId);
};

// Mock function to get payment methods
export const getPaymentMethods = (): PaymentProvider[] => {
  return paymentProviders.filter(provider => provider.isAvailable);
};

// Mock function to update stock for premium apps
export const updateProductStock = (productId: string, quantity: number): boolean => {
  const product = serviceProducts.find(p => p.id === productId);
  if (product && product.stock !== undefined) {
    if (product.stock >= quantity) {
      product.stock -= quantity;
      return true;
    }
  }
  return false;
};

// Mock function to add stock for premium apps
export const addProductStock = (productId: string, quantity: number): boolean => {
  const product = serviceProducts.find(p => p.id === productId);
  if (product && product.stock !== undefined) {
    product.stock += quantity;
    return true;
  }
  return false;
};

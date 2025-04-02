
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateRandomId(prefix: string = ''): string {
  return `${prefix}${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function formatPhone(phone: string): string {
  if (!phone) return '';
  if (phone.startsWith('0')) {
    phone = '+62' + phone.substring(1);
  }
  return phone;
}

// Add a toast variant mapper for compatibility
export function mapToastVariant(variant: 'success' | 'error' | 'info' | 'warning'): "default" | "destructive" {
  switch (variant) {
    case 'success':
    case 'info':
    case 'warning':
      return 'default';
    case 'error':
      return 'destructive';
    default:
      return 'default';
  }
}

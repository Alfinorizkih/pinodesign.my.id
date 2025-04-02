
import { Notification, NotificationType } from '@/types';

// Mock notifications database
let notifications: Notification[] = [];

// Create a notification
export const createNotification = (
  userId: string,
  title: string,
  message: string,
  type: NotificationType
): Notification => {
  const notification: Notification = {
    id: `notify-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date(),
  };

  notifications.push(notification);
  return notification;
};

// Mark a notification as read
export const markNotificationAsRead = (notificationId: string): boolean => {
  const notification = notifications.find(n => n.id === notificationId);
  if (!notification) return false;

  notification.isRead = true;
  return true;
};

// Get all notifications for a user
export const getUserNotifications = (userId: string): Notification[] => {
  return notifications
    .filter(notification => notification.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Get unread notification count for a user
export const getUnreadNotificationCount = (userId: string): number => {
  return notifications.filter(notification => notification.userId === userId && !notification.isRead).length;
};

// Delete a notification
export const deleteNotification = (notificationId: string): boolean => {
  const index = notifications.findIndex(n => n.id === notificationId);
  if (index === -1) return false;

  notifications.splice(index, 1);
  return true;
};

// Send transaction notification
export const sendTransactionNotification = (
  userId: string,
  transactionId: string,
  productName: string,
  status: 'SUCCESS' | 'FAILED',
  targetNumber: string
): Notification => {
  let title: string;
  let message: string;
  let type: NotificationType;

  if (status === 'SUCCESS') {
    title = 'Transaksi Berhasil';
    message = `Transaksi untuk ${productName} ke ${targetNumber} telah berhasil. ID Transaksi: ${transactionId}`;
    type = 'SUCCESS';
  } else {
    title = 'Transaksi Gagal';
    message = `Transaksi untuk ${productName} ke ${targetNumber} gagal. Mohon coba lagi nanti. ID Transaksi: ${transactionId}`;
    type = 'ERROR';
  }

  return createNotification(userId, title, message, type);
};

// Initialize with some sample notifications
export const initializeNotifications = () => {
  const sampleNotifications: Partial<Notification>[] = [
    {
      id: 'notify-1671723600000-123',
      userId: 'user1',
      title: 'Transaksi Berhasil',
      message: 'Transaksi untuk Pulsa 10,000 ke 081234567890 telah berhasil.',
      type: 'SUCCESS',
      isRead: true,
      createdAt: new Date(Date.now() - 3600000 * 24 * 3), // 3 days ago
    },
    {
      id: 'notify-1671810000000-456',
      userId: 'user1',
      title: 'Transaksi Berhasil',
      message: 'Transaksi untuk Paket Data 5GB ke 081234567890 telah berhasil.',
      type: 'SUCCESS',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
    },
    {
      id: 'notify-1671896400000-789',
      userId: 'user1',
      title: 'Aplikasi Premium Menunggu Konfirmasi',
      message: 'Pembelian Netflix Premium 1 Bulan sedang menunggu konfirmasi admin.',
      type: 'INFO',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
    },
  ];

  sampleNotifications.forEach(notification => {
    notifications.push(notification as Notification);
  });
};

// Initialize with sample data
initializeNotifications();

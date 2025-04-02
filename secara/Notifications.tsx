
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NotificationItem from '@/components/NotificationItem';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getUserNotifications } from '@/services/notificationService';
import { Notification } from '@/types';
import { Bell } from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);
  
  const loadNotifications = () => {
    if (!user) return;
    
    setIsLoading(true);
    const userNotifications = getUserNotifications(user.id);
    setNotifications(userNotifications);
    setIsLoading(false);
  };
  
  const handleMarkAsRead = () => {
    // Refresh notifications
    loadNotifications();
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notifikasi</h1>
        <p className="text-gray-600">Semua notifikasi dan pemberitahuan</p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      ) : notifications.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Bell className="h-6 w-6 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold">Belum ada notifikasi</h2>
          <p className="text-gray-600 mt-2">
            Anda belum memiliki notifikasi baru
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default Notifications;

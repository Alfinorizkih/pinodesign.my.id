
import { Notification } from '@/types';
import { markNotificationAsRead } from '@/services/notificationService';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Info, 
  AlertTriangle
} from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: () => void;
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case 'SUCCESS':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'ERROR':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'WARNING':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'INFO':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const handleClick = () => {
    if (!notification.isRead) {
      markNotificationAsRead(notification.id);
      onMarkAsRead();
    }
  };
  
  return (
    <div 
      className={`p-4 border-b cursor-pointer transition-colors ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{notification.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-2">{formatDate(notification.createdAt)}</p>
        </div>
        {!notification.isRead && (
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;

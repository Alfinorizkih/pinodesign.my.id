
import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Bell, LogOut, Home, History, ShoppingBag, UserCircle, ShieldCheck } from 'lucide-react';
import { getUserNotifications, getUnreadNotificationCount } from '@/services/notificationService';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const unreadCount = user ? getUnreadNotificationCount(user.id) : 0;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigate('/login')}>Login to continue</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-brand shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Sistem Isi Ulang Otomatis</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/notifications')}
                  className="text-white hover:bg-brand-hover"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-white hover:bg-brand-hover"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-gray-200 py-3 sticky bottom-0">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className={`flex flex-col items-center w-1/5 ${isActive('/') ? 'text-brand font-medium' : 'text-gray-500'}`}
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center w-1/5 ${isActive('/history') ? 'text-brand font-medium' : 'text-gray-500'}`}
              onClick={() => navigate('/history')}
            >
              <History className="h-5 w-5" />
              <span className="text-xs mt-1">History</span>
            </Button>
            {isAdmin ? (
              <Button
                variant="ghost"
                className={`flex flex-col items-center w-1/5 ${isActive('/admin') ? 'text-brand font-medium' : 'text-gray-500'}`}
                onClick={() => navigate('/admin')}
              >
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs mt-1">Admin</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                className={`flex flex-col items-center w-1/5 ${isActive('/transactions') ? 'text-brand font-medium' : 'text-gray-500'}`}
                onClick={() => navigate('/transactions')}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="text-xs mt-1">Orders</span>
              </Button>
            )}
            <Button
              variant="ghost"
              className={`flex flex-col items-center w-1/5 ${isActive('/profile') ? 'text-brand font-medium' : 'text-gray-500'}`}
              onClick={() => navigate('/profile')}
            >
              <UserCircle className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

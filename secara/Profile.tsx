
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ShieldCheck, Mail, Phone } from 'lucide-react';

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah berhasil keluar dari akun",
    });
    navigate('/login');
  };
  
  if (!user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profil</h1>
        <p className="text-gray-600">Informasi dan pengaturan akun Anda</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <User className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            {isAdmin && (
              <div className="flex items-center mt-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                <ShieldCheck className="h-3 w-3 mr-1" /> Admin
              </div>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Nomor Telepon</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Keluar
      </Button>
    </MainLayout>
  );
};

export default Profile;


import MainLayout from '@/components/layout/MainLayout';
import { ShieldCheck } from 'lucide-react';

const AccessDenied = () => {
  return (
    <MainLayout>
      <div className="text-center py-12">
        <ShieldCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Akses Terbatas</h2>
        <p className="text-gray-600 mt-2">
          Anda tidak memiliki akses ke halaman admin
        </p>
      </div>
    </MainLayout>
  );
};

export default AccessDenied;

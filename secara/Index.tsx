
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ServiceCard from '@/components/ServiceCard';
import TransactionCard from '@/components/TransactionCard';
import { serviceCategories } from '@/data/services';
import { getUserTransactions } from '@/services/transactionService';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from '@/types';

const Index = () => {
  const { user } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      // Get recent transactions
      const loadTransactions = async () => {
        try {
          const transactions = await getUserTransactions(user.id);
          setRecentTransactions(transactions.slice(0, 3));
        } catch (error) {
          console.error("Error loading transactions:", error);
          setRecentTransactions([]);
        }
      };
      
      loadTransactions();
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Selamat Datang</h1>
        <p className="text-gray-600">Isi ulang otomatis untuk semua kebutuhan Anda</p>
      </div>

      <Tabs defaultValue="services" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Layanan</TabsTrigger>
          <TabsTrigger value="recent">Transaksi Terbaru</TabsTrigger>
        </TabsList>
        <TabsContent value="services">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {serviceCategories.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="mt-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada transaksi</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
        <h2 className="text-lg font-medium text-blue-700 mb-2">Sistem Isi Ulang Januari</h2>
        <p className="text-sm text-blue-600">
          Sistem isi ulang otomatis untuk Januari telah aktif. Semua transaksi untuk pulsa, paket data, game, e-wallet, dan listrik PLN akan diproses secara otomatis.
        </p>
      </div>
    </MainLayout>
  );
};

export default Index;

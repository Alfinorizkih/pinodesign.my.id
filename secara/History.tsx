
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TransactionCard from '@/components/TransactionCard';
import { useAuth } from '@/contexts/AuthContext';
import { getUserTransactions } from '@/services/transactionService';
import { Transaction } from '@/types';

const History = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);
  
  const loadTransactions = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userTransactions = await getUserTransactions(user.id);
      setTransactions(userTransactions);
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>
        <p className="text-gray-600">Semua transaksi yang telah Anda lakukan</p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      ) : transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Belum ada transaksi</h2>
          <p className="text-gray-600 mt-2">
            Anda belum melakukan transaksi apapun
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default History;

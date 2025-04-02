
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getAllTransactions } from '@/services/transactionService';
import { serviceProducts, addProductStock } from '@/data/services';
import { Transaction, ServiceProduct } from '@/types';
import { mapToastVariant } from '@/lib/utils';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminAlert from '@/components/admin/AdminAlert';
import AccessDenied from '@/components/admin/AccessDenied';

const Admin = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [premiumProducts, setPremiumProducts] = useState<ServiceProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [stockAmount, setStockAmount] = useState<number>(1);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setIsLoading(true);
    
    try {
      // Load all transactions
      const allTransactions = await getAllTransactions();
      setTransactions(allTransactions);
      
      // Load premium app products
      const premiumApps = serviceProducts.filter(p => p.categoryId === 'premium-app');
      setPremiumProducts(premiumApps);
      
      if (premiumApps.length > 0) {
        setSelectedProduct(premiumApps[0].id);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddStock = () => {
    if (!selectedProduct || stockAmount <= 0) return;
    
    const success = addProductStock(selectedProduct, stockAmount);
    
    if (success) {
      toast({
        title: "Stok Berhasil Ditambahkan",
        description: `Berhasil menambahkan ${stockAmount} stok`,
        variant: mapToastVariant("success"),
      });
      
      // Refresh data
      loadData();
    } else {
      toast({
        title: "Gagal Menambahkan Stok",
        description: "Terjadi kesalahan saat menambahkan stok",
        variant: "destructive",
      });
    }
  };
  
  if (!isAdmin) {
    return <AccessDenied />;
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Kelola transaksi dan stok aplikasi premium</p>
      </div>
      
      <AdminAlert />
      
      <AdminTabs 
        isLoading={isLoading}
        transactions={transactions}
        premiumProducts={premiumProducts}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        stockAmount={stockAmount}
        setStockAmount={setStockAmount}
        handleAddStock={handleAddStock}
        loadData={loadData}
      />
    </MainLayout>
  );
};

export default Admin;

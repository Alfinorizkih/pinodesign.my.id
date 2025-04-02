
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingTransactions from "@/components/admin/PendingTransactions";
import StockManagement from "@/components/admin/StockManagement";
import RecentTransactions from "@/components/admin/RecentTransactions";
import { Transaction, ServiceProduct } from "@/types";

interface AdminTabsProps {
  isLoading: boolean;
  transactions: Transaction[];
  premiumProducts: ServiceProduct[];
  selectedProduct: string;
  setSelectedProduct: (id: string) => void;
  stockAmount: number;
  setStockAmount: (amount: number) => void;
  handleAddStock: () => void;
  loadData: () => void;
}

const AdminTabs = ({
  isLoading,
  transactions,
  premiumProducts,
  selectedProduct,
  setSelectedProduct,
  stockAmount,
  setStockAmount,
  handleAddStock,
  loadData
}: AdminTabsProps) => {
  const getPendingTransactions = () => {
    return transactions.filter(tx => 
      tx.status === 'PENDING' && 
      tx.categoryId === 'premium-app'
    );
  };
  
  const getRecentTransactions = () => {
    return transactions.slice(0, 5);
  };

  return (
    <Tabs defaultValue="pending" className="mb-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pending">Menunggu</TabsTrigger>
        <TabsTrigger value="stock">Stok</TabsTrigger>
        <TabsTrigger value="recent">Terbaru</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending">
        <PendingTransactions 
          isLoading={isLoading} 
          pendingTransactions={getPendingTransactions()} 
        />
      </TabsContent>
      
      <TabsContent value="stock">
        <StockManagement 
          premiumProducts={premiumProducts}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          stockAmount={stockAmount}
          setStockAmount={setStockAmount}
          handleAddStock={handleAddStock}
          isLoading={isLoading}
        />
      </TabsContent>
      
      <TabsContent value="recent">
        <RecentTransactions 
          isLoading={isLoading} 
          recentTransactions={getRecentTransactions()} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;

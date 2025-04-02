
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceProduct } from '@/types';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import StockList from './StockList';

interface StockManagementProps {
  premiumProducts: ServiceProduct[];
  selectedProduct: string;
  setSelectedProduct: (id: string) => void;
  stockAmount: number;
  setStockAmount: (amount: number) => void;
  handleAddStock: () => void;
  isLoading?: boolean;
}

const StockManagement = ({
  premiumProducts,
  selectedProduct,
  setSelectedProduct,
  stockAmount,
  setStockAmount,
  handleAddStock,
  isLoading = false
}: StockManagementProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Separator className="my-4" />
            <div>
              <Skeleton className="h-6 w-1/2 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Stok Aplikasi Premium</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="product">Pilih Produk</Label>
            <select 
              id="product"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {premiumProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Stok: {product.stock}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="amount">Jumlah Stok</Label>
            <Input 
              id="amount"
              type="number"
              min="1"
              value={stockAmount}
              onChange={(e) => setStockAmount(parseInt(e.target.value))}
            />
          </div>
          
          <Button 
            className="w-full bg-brand hover:bg-brand-hover"
            onClick={handleAddStock}
          >
            Tambah Stok
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <StockList products={premiumProducts} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default StockManagement;

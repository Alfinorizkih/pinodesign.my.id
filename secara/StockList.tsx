
import { ServiceProduct } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface StockListProps {
  products: ServiceProduct[];
  isLoading?: boolean;
}

const StockList = ({ products, isLoading = false }: StockListProps) => {
  if (isLoading) {
    return (
      <div>
        <h3 className="font-medium mb-3">Stok Tersedia</h3>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium mb-3">Stok Tersedia</h3>
      <div className="space-y-2">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between py-2 border-b">
            <span>{product.name}</span>
            <span className="font-medium">{product.stock} item</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;

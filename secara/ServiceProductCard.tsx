
import { ServiceProduct } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface ServiceProductCardProps {
  product: ServiceProduct;
  onSelect: (product: ServiceProduct) => void;
  selected?: boolean;
}

const ServiceProductCard = ({ product, onSelect, selected }: ServiceProductCardProps) => {
  return (
    <Card 
      className={`cursor-pointer border transition-all ${selected ? 'border-brand bg-blue-50' : 'hover:border-gray-400'}`}
      onClick={() => onSelect(product)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            
            {product.stock !== undefined && (
              <p className="text-xs text-gray-500 mt-1">
                Stok: {product.stock} tersedia
              </p>
            )}
          </div>
          
          <div className="text-right">
            {product.discount ? (
              <>
                <p className="text-sm line-through text-gray-500">
                  {formatCurrency(product.price + product.discount)}
                </p>
                <p className="font-bold text-brand">
                  {formatCurrency(product.price)}
                </p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Save {formatCurrency(product.discount)}
                </span>
              </>
            ) : (
              <p className="font-bold text-brand">{formatCurrency(product.price)}</p>
            )}
          </div>
        </div>
        
        {selected && (
          <Button className="w-full mt-3 bg-brand hover:bg-brand-hover">
            Selected
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceProductCard;

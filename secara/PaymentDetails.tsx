
import { ServiceProduct, ServiceCategory } from '@/types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

interface PaymentDetailsProps {
  product: ServiceProduct;
  category: ServiceCategory;
  targetNumber: string;
}

const PaymentDetails = ({ product, category, targetNumber }: PaymentDetailsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Detail Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Layanan</span>
            <span className="font-medium">{category.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Produk</span>
            <span className="font-medium">{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nomor Tujuan</span>
            <span className="font-medium">{targetNumber}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-gray-600">Total Pembayaran</span>
            <span className="font-bold text-brand">{formatCurrency(product.price)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDetails;

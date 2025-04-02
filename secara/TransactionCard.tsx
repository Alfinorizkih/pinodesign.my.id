
import { Transaction } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Smartphone,
  Wifi,
  Gamepad2,
  Wallet,
  Zap,
  Award
} from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  showDetails?: boolean;
}

const TransactionCard = ({ transaction, showDetails = false }: TransactionCardProps) => {
  const navigate = useNavigate();
  
  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'SUCCESS':
        return <Badge className="bg-success hover:bg-success-hover gap-1"><CheckCircle className="h-3 w-3" /> Berhasil</Badge>;
      case 'PENDING':
        return <Badge className="bg-amber-500 hover:bg-amber-600 gap-1"><Clock className="h-3 w-3" /> Menunggu</Badge>;
      case 'PROCESSING':
        return <Badge className="bg-blue-500 hover:bg-blue-600 gap-1"><Clock className="h-3 w-3" /> Diproses</Badge>;
      case 'FAILED':
        return <Badge className="bg-destructive hover:bg-destructive gap-1"><XCircle className="h-3 w-3" /> Gagal</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-gray-500 hover:bg-gray-600 gap-1"><AlertTriangle className="h-3 w-3" /> Dibatalkan</Badge>;
      default:
        return <Badge>{transaction.status}</Badge>;
    }
  };
  
  const getCategoryIcon = () => {
    switch (transaction.categoryId) {
      case 'pulsa':
        return <Smartphone className="h-5 w-5 text-brand" />;
      case 'data':
        return <Wifi className="h-5 w-5 text-brand" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5 text-brand" />;
      case 'ewallet':
        return <Wallet className="h-5 w-5 text-brand" />;
      case 'electricity':
        return <Zap className="h-5 w-5 text-brand" />;
      case 'premium-app':
        return <Award className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleClick = () => {
    navigate(`/transaction/${transaction.id}`);
  };
  
  return (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-gray-100 rounded-full">
              {getCategoryIcon()}
            </div>
            <div>
              <h3 className="font-medium">{transaction.productName}</h3>
              <p className="text-sm text-gray-600">{transaction.categoryName}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
          <div className="text-gray-600">Tanggal:</div>
          <div className="text-right">{formatDate(transaction.createdAt)}</div>
          
          <div className="text-gray-600">Nomor Tujuan:</div>
          <div className="text-right font-medium">{transaction.targetNumber}</div>
          
          <div className="text-gray-600">Nominal:</div>
          <div className="text-right font-bold text-brand">{formatCurrency(transaction.amount)}</div>
          
          {showDetails && (
            <>
              <div className="text-gray-600">Metode Pembayaran:</div>
              <div className="text-right">{transaction.paymentProvider}</div>
              
              <div className="text-gray-600">ID Transaksi:</div>
              <div className="text-right">{transaction.referenceNumber}</div>
              
              {transaction.completionTime && (
                <>
                  <div className="text-gray-600">Waktu Selesai:</div>
                  <div className="text-right">{formatDate(transaction.completionTime)}</div>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;

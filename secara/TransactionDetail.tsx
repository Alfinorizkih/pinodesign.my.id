import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getTransaction, processTransaction } from '@/services/transactionService';
import { sendTransactionNotification } from '@/services/notificationService';
import { Transaction } from '@/types';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Copy
} from 'lucide-react';
import { formatCurrency, mapToastVariant } from '@/lib/utils';

const TransactionDetail = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (transactionId && user) {
      loadTransaction();
    }
  }, [transactionId, user]);
  
  const loadTransaction = async () => {
    if (!transactionId) return;
    
    setIsLoading(true);
    try {
      const tx = await getTransaction(transactionId);
      setTransaction(tx);
    } catch (error) {
      console.error("Error loading transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusBadge = () => {
    if (!transaction) return null;
    
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
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  const handleCopyReference = () => {
    if (!transaction?.referenceNumber) return;
    
    navigator.clipboard.writeText(transaction.referenceNumber);
    toast({
      title: "Copied",
      description: "Reference number copied to clipboard",
    });
  };
  
  const handleProcessTransaction = async () => {
    if (!transaction || !user) return;
    
    setIsProcessing(true);
    
    try {
      const updatedTx = await processTransaction(transaction.id);
      
      if (updatedTx && updatedTx.status === 'SUCCESS') {
        // Send success notification
        await sendTransactionNotification(
          transaction.userId,
          transaction.id,
          transaction.productName,
          'SUCCESS',
          transaction.targetNumber
        );
        
        toast({
          title: "Transaksi Berhasil",
          description: "Transaksi telah berhasil diproses",
          variant: mapToastVariant("success"),
        });
      } else {
        // Send failure notification
        await sendTransactionNotification(
          transaction.userId,
          transaction.id,
          transaction.productName,
          'FAILED',
          transaction.targetNumber
        );
        
        toast({
          title: "Transaksi Gagal",
          description: "Terjadi kesalahan saat memproses transaksi",
          variant: "destructive",
        });
      }
      
      // Refresh transaction data
      await loadTransaction();
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Proses Gagal",
        description: "Terjadi kesalahan saat memproses transaksi",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!transaction) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold">Transaksi tidak ditemukan</h2>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/history')}
          >
            Kembali ke Riwayat Transaksi
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-2 -ml-2 p-2"
        >
          <ArrowLeft className="h-5 w-5 mr-1" /> Kembali
        </Button>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Detail Transaksi</h1>
          {getStatusBadge()}
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informasi Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ID Transaksi</span>
              <div className="flex items-center">
                <span className="font-medium mr-2">{transaction.referenceNumber}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleCopyReference}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Transaksi</span>
              <span className="font-medium">{formatDate(transaction.createdAt)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">Produk</span>
              <span className="font-medium">{transaction.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Kategori</span>
              <span className="font-medium">{transaction.categoryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nomor Tujuan</span>
              <span className="font-medium">{transaction.targetNumber}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">Total Pembayaran</span>
              <span className="font-bold text-brand">{formatCurrency(transaction.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Metode Pembayaran</span>
              <span className="font-medium">{transaction.paymentProvider}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Status Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-medium">{transaction.status}</span>
            </div>
            {transaction.processingTime && (
              <div className="flex justify-between">
                <span className="text-gray-600">Waktu Pemrosesan</span>
                <span className="font-medium">{formatDate(transaction.processingTime)}</span>
              </div>
            )}
            {transaction.completionTime && (
              <div className="flex justify-between">
                <span className="text-gray-600">Waktu Selesai</span>
                <span className="font-medium">{formatDate(transaction.completionTime)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {isAdmin && transaction.status === 'PENDING' && (
        <Button 
          className="w-full bg-brand hover:bg-brand-hover" 
          size="lg"
          onClick={handleProcessTransaction}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Memproses Transaksi
            </>
          ) : (
            'Proses Transaksi'
          )}
        </Button>
      )}
    </MainLayout>
  );
};

export default TransactionDetail;

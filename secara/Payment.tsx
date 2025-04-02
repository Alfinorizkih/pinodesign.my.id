
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getPaymentMethods } from '@/data/services';
import { createTransaction, processTransaction } from '@/services/transactionService';
import { sendTransactionNotification } from '@/services/notificationService';
import { ServiceProduct, ServiceCategory, PaymentProvider } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { mapToastVariant } from '@/lib/utils';

// Import new components
import PaymentDetails from '@/components/payment/PaymentDetails';
import ServiceAlert from '@/components/payment/ServiceAlert';
import PaymentMethodList from '@/components/payment/PaymentMethodList';
import PaymentActionButton from '@/components/payment/PaymentActionButton';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<ServiceProduct | null>(null);
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [targetNumber, setTargetNumber] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentProvider[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentProvider | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Get data from location state
    const state = location.state;
    if (!state || !state.product || !state.category || !state.targetNumber) {
      navigate('/');
      return;
    }
    
    setProduct(state.product);
    setCategory(state.category);
    setTargetNumber(state.targetNumber);
    
    // Load payment methods
    const methods = getPaymentMethods();
    setPaymentMethods(methods);
  }, [location, navigate]);
  
  const handlePayment = async () => {
    if (!user || !product || !category || !selectedPaymentMethod) return;
    
    setIsProcessing(true);
    
    try {
      // Create the transaction
      const transaction = await createTransaction(
        user.id,
        product.id,
        targetNumber,
        selectedPaymentMethod.type,
        selectedPaymentMethod.name
      );
      
      if (!transaction) {
        throw new Error('Failed to create transaction');
      }
      
      toast({
        title: "Transaksi Dibuat",
        description: "Sedang memproses pembayaran Anda",
      });
      
      if (category.isAutomatic) {
        // For automatic services, process immediately
        const processedTx = await processTransaction(transaction.id);
        
        if (processedTx && processedTx.status === 'SUCCESS') {
          // Send success notification
          await sendTransactionNotification(
            user.id,
            transaction.id,
            product.name,
            'SUCCESS',
            targetNumber
          );
          
          toast({
            title: "Pembayaran Berhasil",
            description: "Transaksi Anda telah berhasil diproses",
            variant: mapToastVariant("success"),
          });
        } else {
          // Send failure notification
          await sendTransactionNotification(
            user.id,
            transaction.id,
            product.name,
            'FAILED',
            targetNumber
          );
          
          toast({
            title: "Pembayaran Gagal",
            description: "Terjadi kesalahan saat memproses transaksi",
            variant: "destructive",
          });
        }
      } else {
        // For manual confirmation services, just send notification
        await sendTransactionNotification(
          user.id,
          transaction.id,
          product.name,
          'SUCCESS',
          targetNumber
        );
        
        toast({
          title: "Pesanan Diterima",
          description: "Pesanan Anda akan diproses secara manual",
        });
      }
      
      // Navigate to transaction detail
      navigate(`/transaction/${transaction.id}`);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Transaksi Gagal",
        description: "Terjadi kesalahan saat memproses transaksi",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!product || !category) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
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
        <h1 className="text-2xl font-bold">Pembayaran</h1>
        <p className="text-gray-600">Pilih metode pembayaran untuk melanjutkan</p>
      </div>
      
      <PaymentDetails 
        product={product} 
        category={category} 
        targetNumber={targetNumber} 
      />
      
      {!category.isAutomatic && (
        <ServiceAlert categoryName={category.name} />
      )}
      
      <h2 className="text-lg font-medium mb-3">Metode Pembayaran</h2>
      <PaymentMethodList 
        paymentMethods={paymentMethods}
        selectedPaymentMethod={selectedPaymentMethod}
        onSelect={setSelectedPaymentMethod}
      />
      
      <PaymentActionButton 
        isProcessing={isProcessing}
        disabled={!selectedPaymentMethod}
        onClick={handlePayment}
      />
    </MainLayout>
  );
};

export default Payment;

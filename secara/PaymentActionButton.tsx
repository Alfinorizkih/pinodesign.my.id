
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface PaymentActionButtonProps {
  isProcessing: boolean;
  disabled: boolean;
  onClick: () => void;
}

const PaymentActionButton = ({ 
  isProcessing, 
  disabled, 
  onClick 
}: PaymentActionButtonProps) => {
  return (
    <Button 
      className="w-full bg-brand hover:bg-brand-hover" 
      size="lg"
      onClick={onClick}
      disabled={disabled || isProcessing}
    >
      {isProcessing ? (
        <>
          <Clock className="mr-2 h-4 w-4 animate-spin" />
          Memproses Pembayaran
        </>
      ) : (
        'Bayar Sekarang'
      )}
    </Button>
  );
};

export default PaymentActionButton;

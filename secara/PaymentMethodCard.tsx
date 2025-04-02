
import { PaymentProvider } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethodCardProps {
  paymentProvider: PaymentProvider;
  selected: boolean;
  onSelect: (provider: PaymentProvider) => void;
}

const PaymentMethodCard = ({ paymentProvider, selected, onSelect }: PaymentMethodCardProps) => {
  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as any)[paymentProvider.logo] || LucideIcons.CreditCard;

  return (
    <Card 
      className={cn(
        "payment-method-card cursor-pointer border-2", 
        selected ? "border-primary" : "border-transparent"
      )}
      onClick={() => onSelect(paymentProvider)}
    >
      <CardContent className="p-3 flex items-center">
        <div className={cn(
          "p-2 rounded-full mr-3", 
          selected ? "bg-blue-100 text-primary" : "bg-gray-100"
        )}>
          <IconComponent className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">{paymentProvider.name}</h3>
          <p className="text-xs text-gray-600">
            {paymentProvider.type === 'BANK_TRANSFER' && 'Transfer Bank'}
            {paymentProvider.type === 'EWALLET' && 'E-Wallet'}
            {paymentProvider.type === 'QRIS' && 'QRIS Payment'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;

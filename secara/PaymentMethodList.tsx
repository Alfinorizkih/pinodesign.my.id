
import { useState } from 'react';
import PaymentMethodCard from '@/components/PaymentMethodCard';
import { PaymentProvider } from '@/types';

interface PaymentMethodListProps {
  paymentMethods: PaymentProvider[];
  onSelect: (method: PaymentProvider) => void;
  selectedPaymentMethod: PaymentProvider | null;
}

const PaymentMethodList = ({ 
  paymentMethods, 
  onSelect, 
  selectedPaymentMethod 
}: PaymentMethodListProps) => {
  return (
    <div className="space-y-3 mb-6">
      {paymentMethods.map((method) => (
        <PaymentMethodCard 
          key={method.id}
          paymentProvider={method}
          selected={selectedPaymentMethod?.id === method.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default PaymentMethodList;

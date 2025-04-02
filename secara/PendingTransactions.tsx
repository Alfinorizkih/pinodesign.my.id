
import TransactionCard from '@/components/TransactionCard';
import { Transaction } from '@/types';
import { LoadingIndicator } from '@/components/ui/loading-indicator';

interface PendingTransactionsProps {
  isLoading: boolean;
  pendingTransactions: Transaction[];
}

const PendingTransactions = ({ isLoading, pendingTransactions }: PendingTransactionsProps) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-3">Transaksi Menunggu Konfirmasi</h2>
      {isLoading ? (
        <LoadingIndicator text="Memuat transaksi..." />
      ) : pendingTransactions.length > 0 ? (
        <div className="space-y-4">
          {pendingTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Tidak ada transaksi yang menunggu konfirmasi</p>
        </div>
      )}
    </>
  );
};

export default PendingTransactions;

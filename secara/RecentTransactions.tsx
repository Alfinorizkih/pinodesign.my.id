
import TransactionCard from '@/components/TransactionCard';
import { Transaction } from '@/types';
import { LoadingIndicator } from '@/components/ui/loading-indicator';

interface RecentTransactionsProps {
  isLoading: boolean;
  recentTransactions: Transaction[];
}

const RecentTransactions = ({ isLoading, recentTransactions }: RecentTransactionsProps) => {
  return (
    <>
      <h2 className="text-lg font-medium mb-3">Transaksi Terbaru</h2>
      {isLoading ? (
        <LoadingIndicator text="Memuat transaksi..." />
      ) : recentTransactions.length > 0 ? (
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Belum ada transaksi</p>
        </div>
      )}
    </>
  );
};

export default RecentTransactions;

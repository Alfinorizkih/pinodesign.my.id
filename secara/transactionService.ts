
import { Transaction, TransactionStatus, PaymentMethod } from '@/types';
import { getProductById, getCategoryById, updateProductStock } from '@/data/services';
import { 
  fetchFromSheet, 
  appendToSheet, 
  updateInSheet, 
  sheetNames 
} from '@/services/googleSheetService';

// Generate a random reference number
const generateReferenceNumber = (): string => {
  return `TRX-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
};

// Create a new transaction
export const createTransaction = async (
  userId: string,
  productId: string,
  targetNumber: string,
  paymentMethod: PaymentMethod,
  paymentProvider: string
): Promise<Transaction | null> => {
  const product = getProductById(productId);
  if (!product) return null;

  const category = getCategoryById(product.categoryId);
  if (!category) return null;

  // Check stock for premium apps
  if (category.type === 'PREMIUM_APP' && product.stock !== undefined && product.stock <= 0) {
    return null;
  }

  const newTransaction: Transaction = {
    id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    productId,
    productName: product.name,
    categoryId: product.categoryId,
    categoryName: category.name,
    amount: product.price,
    paymentMethod,
    paymentProvider,
    status: 'PENDING',
    targetNumber,
    referenceNumber: generateReferenceNumber(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Add the transaction to the Google Sheet (mock)
  await appendToSheet<Transaction>(sheetNames.TRANSACTIONS, newTransaction);
  return newTransaction;
};

// Process a transaction (simulate payment processing)
export const processTransaction = async (transactionId: string): Promise<Transaction | null> => {
  const transaction = await getTransaction(transactionId);
  if (!transaction || transaction.status !== 'PENDING') return null;

  // Update transaction status to processing
  const updatedTransaction = await updateInSheet<Transaction>(
    sheetNames.TRANSACTIONS,
    transactionId,
    {
      status: 'PROCESSING',
      processingTime: new Date(),
      updatedAt: new Date()
    }
  );

  if (!updatedTransaction) return null;

  // Simulate payment processing (success 95% of the time)
  const success = Math.random() < 0.95;

  return new Promise((resolve) => {
    setTimeout(async () => {
      if (success) {
        const completedTx = await completeTransaction(transactionId);
        resolve(completedTx);
      } else {
        const failedTx = await failTransaction(transactionId);
        resolve(failedTx);
      }
    }, 2000); // Simulate 2 second processing time
  });
};

// Complete a transaction (mark as successful)
export const completeTransaction = async (transactionId: string): Promise<Transaction | null> => {
  const transaction = await getTransaction(transactionId);
  if (!transaction || transaction.status !== 'PROCESSING') return null;

  const product = getProductById(transaction.productId);
  const category = product ? getCategoryById(product.categoryId) : null;

  // For premium apps, update stock
  if (product && category && category.type === 'PREMIUM_APP') {
    updateProductStock(transaction.productId, 1);
  }

  // Update the transaction in the Google Sheet
  return updateInSheet<Transaction>(
    sheetNames.TRANSACTIONS,
    transactionId,
    {
      status: 'SUCCESS',
      completionTime: new Date(),
      updatedAt: new Date()
    }
  );
};

// Fail a transaction
export const failTransaction = async (transactionId: string): Promise<Transaction | null> => {
  const transaction = await getTransaction(transactionId);
  if (!transaction || (transaction.status !== 'PENDING' && transaction.status !== 'PROCESSING')) return null;

  // Update the transaction in the Google Sheet
  return updateInSheet<Transaction>(
    sheetNames.TRANSACTIONS,
    transactionId,
    {
      status: 'FAILED',
      updatedAt: new Date()
    }
  );
};

// Cancel a transaction
export const cancelTransaction = async (transactionId: string): Promise<Transaction | null> => {
  const transaction = await getTransaction(transactionId);
  if (!transaction || transaction.status !== 'PENDING') return null;

  // Update the transaction in the Google Sheet
  return updateInSheet<Transaction>(
    sheetNames.TRANSACTIONS,
    transactionId,
    {
      status: 'CANCELLED',
      updatedAt: new Date()
    }
  );
};

// Get a transaction by ID
export const getTransaction = async (transactionId: string): Promise<Transaction | null> => {
  const transactions = await fetchFromSheet<Transaction>(sheetNames.TRANSACTIONS);
  const transaction = transactions.find(tx => tx.id === transactionId);
  return transaction || null;
};

// Get all transactions for a user
export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
  const transactions = await fetchFromSheet<Transaction>(sheetNames.TRANSACTIONS);
  return transactions.filter(tx => tx.userId === userId);
};

// Get all transactions for admin
export const getAllTransactions = async (): Promise<Transaction[]> => {
  const transactions = await fetchFromSheet<Transaction>(sheetNames.TRANSACTIONS);
  return [...transactions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Function to prepare initial mock data - this is only for mock implementation
// In a real implementation, we would add data directly to Google Sheets
export const initializeTransactions = async () => {
  // Check if we already have data
  const existingTransactions = await fetchFromSheet<Transaction>(sheetNames.TRANSACTIONS);
  if (existingTransactions.length > 0) return;

  // Sample transactions for demonstration
  const mockTransactions: Partial<Transaction>[] = [
    {
      id: 'tx-1671723600000-123',
      userId: 'user1',
      productId: 'pulsa-10k',
      productName: 'Pulsa 10,000',
      categoryId: 'pulsa',
      categoryName: 'Pulsa',
      amount: 11000,
      paymentMethod: 'BANK_TRANSFER',
      paymentProvider: 'bca',
      status: 'SUCCESS',
      targetNumber: '081234567890',
      referenceNumber: 'TRX-123456',
      createdAt: new Date(Date.now() - 3600000 * 24 * 3), // 3 days ago
      updatedAt: new Date(Date.now() - 3600000 * 24 * 3),
      processingTime: new Date(Date.now() - 3600000 * 24 * 3),
      completionTime: new Date(Date.now() - 3600000 * 24 * 3),
    },
    {
      id: 'tx-1671810000000-456',
      userId: 'user1',
      productId: 'data-5gb',
      productName: 'Paket Data 5GB',
      categoryId: 'data',
      categoryName: 'Paket Data',
      amount: 50000,
      paymentMethod: 'EWALLET',
      paymentProvider: 'gopay',
      status: 'SUCCESS',
      targetNumber: '081234567890',
      referenceNumber: 'TRX-234567',
      createdAt: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
      updatedAt: new Date(Date.now() - 3600000 * 24 * 2),
      processingTime: new Date(Date.now() - 3600000 * 24 * 2),
      completionTime: new Date(Date.now() - 3600000 * 24 * 2),
    },
    {
      id: 'tx-1671896400000-789',
      userId: 'user1',
      productId: 'premium-netflix',
      productName: 'Netflix Premium 1 Bulan',
      categoryId: 'premium-app',
      categoryName: 'Aplikasi Premium',
      amount: 60000,
      paymentMethod: 'QRIS',
      paymentProvider: 'qris',
      status: 'PENDING',
      targetNumber: 'user@example.com',
      referenceNumber: 'TRX-345678',
      createdAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
      updatedAt: new Date(Date.now() - 3600000 * 24),
    },
  ];

  // Add mock transactions to the Google Sheet
  for (const tx of mockTransactions) {
    await appendToSheet(sheetNames.TRANSACTIONS, tx as Transaction);
  }
};

// Initialize with some sample data
initializeTransactions().catch(console.error);

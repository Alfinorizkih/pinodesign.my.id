
import { Transaction, ServiceProduct, ServiceCategory, PaymentProvider } from '@/types';

// This is a mock implementation as we can't actually connect to Google Sheets directly from a frontend
// In a real implementation, we would use a backend service or Google Apps Script deployed as a web app
// to handle authentication and data fetching

// The URL for our mock Google Sheets API endpoint
const SHEETS_API_URL = 'https://example.com/api/sheets';

// Mock sheets structure
const SHEETS = {
  TRANSACTIONS: 'transactions',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  PAYMENT_PROVIDERS: 'paymentProviders'
};

// Parse dates when fetching from sheets (simulated here)
const parseDates = (item: any): any => {
  if (item.createdAt) item.createdAt = new Date(item.createdAt);
  if (item.updatedAt) item.updatedAt = new Date(item.updatedAt);
  if (item.processingTime) item.processingTime = new Date(item.processingTime);
  if (item.completionTime) item.completionTime = new Date(item.completionTime);
  return item;
};

// Function to fetch all data from a specific sheet
export async function fetchFromSheet<T>(sheetName: string): Promise<T[]> {
  console.log(`Fetching data from ${sheetName} sheet`);
  
  // In a real implementation, this would be an API call to Google Sheets
  // For now, we'll return mock data from our existing services
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For this mock implementation, we'll just use the data we have in memory
    // We'll replace this with actual Google Sheets integration in a real implementation
    let data: any[] = [];
    
    // Return mock data based on sheet name
    if (sheetName === SHEETS.TRANSACTIONS) {
      // This would come from the Google Sheet in a real implementation
      data = JSON.parse(localStorage.getItem('transactions') || '[]');
    }
    
    // Ensure data is an array before mapping
    if (!Array.isArray(data)) {
      console.error(`Data from ${sheetName} is not an array`, data);
      return [];
    }
    
    return data.map(parseDates) as T[];
  } catch (error) {
    console.error(`Error fetching data from ${sheetName}:`, error);
    return []; // Return empty array on error
  }
}

// Function to append a row to a sheet
export async function appendToSheet<T>(sheetName: string, data: T): Promise<T> {
  console.log(`Appending to ${sheetName} sheet:`, data);
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, we would make an API call to append the data
    if (sheetName === SHEETS.TRANSACTIONS) {
      // Get existing transactions, add the new one, save back to localStorage
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      transactions.push(data);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    
    return data;
  } catch (error) {
    console.error(`Error appending to ${sheetName}:`, error);
    throw error;
  }
}

// Function to update a row in a sheet
export async function updateInSheet<T extends { id: string }>(sheetName: string, id: string, data: Partial<T>): Promise<T | null> {
  console.log(`Updating in ${sheetName} sheet, id: ${id}:`, data);
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, we would make an API call to update the data
    if (sheetName === SHEETS.TRANSACTIONS) {
      // Get existing transactions
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      const index = transactions.findIndex((item: any) => item.id === id);
      
      if (index >= 0) {
        transactions[index] = { ...transactions[index], ...data, updatedAt: new Date() };
        localStorage.setItem('transactions', JSON.stringify(transactions));
        return parseDates(transactions[index]) as T;
      }
      return null;
    }
    
    return null;
  } catch (error) {
    console.error(`Error updating in ${sheetName}:`, error);
    throw error;
  }
}

// Initialize the sheets with our mock data
export async function initializeSheets(): Promise<void> {
  console.log('Initializing Google Sheets mock data');
  
  // Check if we've already initialized
  if (localStorage.getItem('sheetsInitialized')) return;
  
  // Initialize with empty arrays for sheets
  localStorage.setItem('transactions', JSON.stringify([]));
  
  // Import transaction service to get initial data
  try {
    const { getAllTransactions } = await import('@/services/transactionService');
    const transactions = await getAllTransactions();
    
    // Store the transactions
    if (Array.isArray(transactions) && transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  } catch (error) {
    console.error('Error initializing sheets with transaction data:', error);
  }
  
  // Mark as initialized
  localStorage.setItem('sheetsInitialized', 'true');
}

// Call initialization on module load
initializeSheets().catch(console.error);

export const sheetNames = SHEETS;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Shield, Clock } from 'lucide-react';

interface GoogleSheetsInfoProps {
  totalTransactions?: number;
}

const GoogleSheetsInfo: React.FC<GoogleSheetsInfoProps> = ({ totalTransactions = 0 }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Google Sheets Integration</CardTitle>
          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
        </div>
        <CardDescription>
          Data disimpan dalam Google Sheets untuk kemudahan akses dan manajemen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Database className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Penyimpanan Data Terpusat</h4>
              <p className="text-sm text-gray-600">
                Semua transaksi disimpan dalam Google Sheets untuk kemudahan akses, analisis, dan pencadangan data.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Keamanan Data</h4>
              <p className="text-sm text-gray-600">
                Akses ke data dibatasi sesuai dengan pengaturan izin Google Sheets Anda.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Sinkronisasi Otomatis</h4>
              <p className="text-sm text-gray-600">
                Data transaksi otomatis disinkronkan dengan Google Sheets Anda. {totalTransactions} transaksi tercatat.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsInfo;

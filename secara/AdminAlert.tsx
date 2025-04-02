
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const AdminAlert = () => {
  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Otomatisasi Januari</AlertTitle>
      <AlertDescription>
        Sistem isi ulang otomatis untuk Januari telah aktif. Anda hanya perlu mengkonfirmasi transaksi aplikasi premium secara manual.
      </AlertDescription>
    </Alert>
  );
};

export default AdminAlert;

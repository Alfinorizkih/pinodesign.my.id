
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface ServiceAlertProps {
  categoryName: string;
}

const ServiceAlert = ({ categoryName }: ServiceAlertProps) => {
  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Informasi Penting</AlertTitle>
      <AlertDescription>
        Layanan {categoryName} memerlukan konfirmasi manual dari admin. Transaksi akan diproses dalam 1-24 jam.
      </AlertDescription>
    </Alert>
  );
};

export default ServiceAlert;

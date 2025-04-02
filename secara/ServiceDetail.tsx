
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ServiceProductCard from '@/components/ServiceProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getCategoryById, getProductsByCategory } from '@/data/services';
import { ServiceCategory, ServiceProduct } from '@/types';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ServiceDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [products, setProducts] = useState<ServiceProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ServiceProduct | null>(null);
  const [targetNumber, setTargetNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      const categoryData = getCategoryById(categoryId);
      const productsData = getProductsByCategory(categoryId);
      
      setCategory(categoryData || null);
      setProducts(productsData);
      setLoading(false);
    }
  }, [categoryId]);

  const handleProductSelect = (product: ServiceProduct) => {
    setSelectedProduct(product);
  };

  const handleProceed = () => {
    if (!selectedProduct) {
      toast({
        title: "Pilih Produk",
        description: "Silahkan pilih produk terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    if (!targetNumber) {
      toast({
        title: "Masukkan Nomor Tujuan",
        description: "Silahkan masukkan nomor tujuan",
        variant: "destructive",
      });
      return;
    }

    // Proceed to payment
    navigate(`/payment`, { 
      state: { 
        product: selectedProduct,
        category: category,
        targetNumber: targetNumber
      }
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (!category) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold">Layanan tidak ditemukan</h2>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-2 -ml-2 p-2"
        >
          <ArrowLeft className="h-5 w-5 mr-1" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      {!category.isAutomatic && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Perhatian</AlertTitle>
          <AlertDescription>
            Layanan ini memerlukan konfirmasi manual. Pemrosesan pesanan mungkin membutuhkan waktu.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <Label htmlFor="target-number" className="block mb-2">
          {category.type === 'PREMIUM_APP' ? 'Email Tujuan' : 'Nomor Tujuan'}
        </Label>
        <Input
          id="target-number"
          type={category.type === 'PREMIUM_APP' ? 'email' : 'tel'}
          placeholder={category.type === 'PREMIUM_APP' ? 'Masukkan email tujuan' : 'Masukkan nomor tujuan'}
          value={targetNumber}
          onChange={(e) => setTargetNumber(e.target.value)}
        />
      </div>

      <h2 className="text-lg font-medium mb-3">Pilih Layanan</h2>
      <div className="space-y-3 mb-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ServiceProductCard
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
              selected={selectedProduct?.id === product.id}
            />
          ))
        ) : (
          <p className="text-center py-4 text-gray-500">Tidak ada produk tersedia</p>
        )}
      </div>

      <Button 
        className="w-full bg-brand hover:bg-brand-hover" 
        size="lg"
        onClick={handleProceed}
        disabled={!selectedProduct || !targetNumber}
      >
        Lanjutkan ke Pembayaran
      </Button>
    </MainLayout>
  );
};

export default ServiceDetail;

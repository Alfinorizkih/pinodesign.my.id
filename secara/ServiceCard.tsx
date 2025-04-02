
import { ServiceCategory } from '@/types';
import { Icon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  service: ServiceCategory;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();
  
  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;
  
  const handleClick = () => {
    navigate(`/service/${service.id}`);
  };
  
  return (
    <Card 
      className="service-card cursor-pointer h-full"
      onClick={handleClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className={`p-3 rounded-full mb-4 ${service.isAutomatic ? 'bg-blue-100 text-brand' : 'bg-amber-100 text-amber-600'}`}>
          <IconComponent className="h-6 w-6" />
        </div>
        <h3 className="font-medium text-lg mb-2">{service.name}</h3>
        <p className="text-sm text-gray-600">{service.description}</p>
        {!service.isAutomatic && (
          <div className="mt-2 bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full">
            Perlu Konfirmasi
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

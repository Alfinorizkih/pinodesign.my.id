
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  size?: number;
  className?: string;
  text?: string;
}

const LoadingIndicator = ({
  size = 24,
  className,
  text = "Loading..."
}: LoadingIndicatorProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-6", className)}>
      <LoaderCircle className="animate-spin" size={size} />
      {text && <p className="text-muted-foreground mt-2 text-sm">{text}</p>}
    </div>
  );
};

export { LoadingIndicator };

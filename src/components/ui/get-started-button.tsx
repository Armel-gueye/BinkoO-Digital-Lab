import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GetStartedButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function GetStartedButton({ onClick, className }: GetStartedButtonProps) {
  return (
    <Button 
      className={cn("group relative overflow-hidden", className)} 
      size="lg" 
      style={{ borderRadius: 'var(--radius)' }}
      onClick={onClick}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        En savoir plus
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/25 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-primary-foreground">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}

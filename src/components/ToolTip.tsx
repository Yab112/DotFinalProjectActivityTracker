import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface TooltipDemoProps {
  tooltipText: string; 
  tooltipTriger: string;
  variant: "default" | "secondary" | "destructive" | "outline" | null | undefined;
}

export default function TooltipDemo({ tooltipText, tooltipTriger, variant }: TooltipDemoProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className="px-4">
            {tooltipTriger}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p> 
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

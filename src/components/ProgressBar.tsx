import { Progress } from "../components/ui/progress";

interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
  variant?: "primary" | "success" | "accent";
}

export function ProgressBar({ label, current, total, variant = "primary" }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  const gradients = {
    primary: "bg-gradient-primary",
    success: "bg-gradient-success",
    accent: "bg-gradient-accent",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">
          {current} / {total}
        </span>
      </div>
      <div className="relative">
        <Progress value={percentage} className="h-3" />
        <div 
          className={`absolute top-0 left-0 h-full ${gradients[variant]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

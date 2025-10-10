import { type LucideIcon } from "lucide-react";
import { Card } from "../components/ui/card";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
}

export function AchievementBadge({ icon: Icon, title, description, unlocked }: AchievementBadgeProps) {
  return (
    <Card className={`p-4 transition-all ${
      unlocked 
        ? "bg-gradient-primary text-white shadow-glow hover:scale-105" 
        : "bg-muted opacity-50"
    }`}>
      <div className="flex flex-col items-center text-center gap-2">
        <div className={`p-3 rounded-full ${unlocked ? "bg-white/20" : "bg-background"}`}>
          <Icon className={`h-6 w-6 ${unlocked ? "text-white" : "text-muted-foreground"}`} />
        </div>
        <h4 className={`font-semibold text-sm ${!unlocked && "text-foreground"}`}>{title}</h4>
        <p className={`text-xs ${unlocked ? "text-white/80" : "text-muted-foreground"}`}>
          {description}
        </p>
      </div>
    </Card>
  );
}

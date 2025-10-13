import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PodiumCardProps {
  position: 1 | 2 | 3;
  name: string;
  points: number;
  avatar?: string;
}

export function PodiumCard({ position, name, points, avatar }: PodiumCardProps) {
  const isFirstPlace = position === 1;

  const podiumBarColor = {
    1: "bg-[#4B006E]",
    2: "bg-[#6C1A89]",
    3: "bg-[#6C1A89]",
  };

  const avatarBorderColor = {
    1: "border-[#F6A800]",
    2: "border-[#0099E0]",
    3: "border-[#00C46B]",
  };

  const positionBgColor = {
    1: "bg-[#F6A800]",
    2: "bg-[#0099E0]",
    3: "bg-[#00C46B]",
  };

  const pointsColor = {
    1: "text-[#F6A800]",
    2: "text-[#0099E0]",
    3: "text-[#00C46B]",
  };

  const heights = {
    1: "h-45", 
    2: "h-36", 
    3: "h-32", 
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative mb-2">
        <Avatar
          className={cn(
            "border-4 h-20 w-20",
            isFirstPlace && "h-24 w-24",
            avatarBorderColor[position]
          )}
        >
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        {isFirstPlace && (
          <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-8 text-[#F6A800] fill-[#F6A800]" />
        )}

        <div
          className={cn(
            "absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md",
            positionBgColor[position]
          )}
        >
          {position}
        </div>
      </div>

      <div
        className={cn(
          "w-32 flex flex-col items-center justify-end rounded-t-3xl pt-8 pb-4",
          podiumBarColor[position],
          heights[position]
        )}
      >
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className={cn("text-base font-bold mt-1", pointsColor[position])}>
          {points}
        </p>
      </div>
    </div>
  );
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  iconType: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserAchievementsResponse {
  achievements: Achievement[];
  totalUnlocked: number;
  totalAvailable: number;
}

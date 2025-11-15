import { api } from "@/lib/api";
import type { UserAchievementsResponse } from "@/dtos/AchievementDTOs";

export const achievementService = {
  async getUserAchievements(): Promise<UserAchievementsResponse> {
    const { data } = await api.get<UserAchievementsResponse>(
      "/achievements/me"
    );
    return data;
  },
};

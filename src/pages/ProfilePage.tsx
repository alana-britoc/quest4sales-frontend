import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Edit2,
  Target,
  Award,
  Star,
  Crown,
  Flame,
  Zap,
  Lock,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import { achievementService } from "@/services/achievementService";
import { rankingService } from "@/services/rankingService";
import { salesService } from "@/services/salesService";
import { competitionService } from "@/services/competitionService";
import type { User as UserType } from "@/dtos/UserDTOs";
import type { Achievement } from "@/dtos/AchievementDTOs";
import type { Ranking } from "@/dtos/RankingDTOs";
import type { Competition } from "@/dtos/CompetitionDTOs";
import { toast } from "sonner";

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return "??";
  const f = firstName?.[0] || "";
  const l = lastName?.[0] || "";
  return `${f}${l}`.toUpperCase();
};

const iconMap: Record<string, any> = {
  Crown,
  Flame,
  Star,
  Zap,
  Target,
  Award,
};

function UserAvatar({
  firstName,
  lastName,
  className,
}: {
  firstName?: string;
  lastName?: string;
  className?: string;
}) {
  const initials = getInitials(firstName, lastName);
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-700 ${className}`}
    >
      <span className="font-bold text-white">{initials}</span>
    </div>
  );
}

interface ProfileTabsProps {
  userData: UserType;
  onUpdateProfile: (data: { firstName: string; lastName: string; email: string }) => void;
  onUpdatePassword: (data: { currentPassword: string; newPassword: string }) => void;
  isUpdating: boolean;
}

function ProfileTabs({ userData, onUpdateProfile, onUpdatePassword, isUpdating }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("perfil");
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [email, setEmail] = useState(userData.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileSubmit = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    onUpdateProfile({ firstName, lastName, email });
  };

  const handlePasswordSubmit = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Preencha todos os campos de senha");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres");
      return;
    }
    onUpdatePassword({ currentPassword, newPassword });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <div className="flex border-b border-white/10 mb-6">
        <button
          onClick={() => setActiveTab("perfil")}
          className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold transition-all ${
            activeTab === "perfil"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <User className="w-4 h-4" />
          Perfil
        </button>
        <button
          onClick={() => setActiveTab("senha")}
          className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold transition-all ${
            activeTab === "senha"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Lock className="w-4 h-4" />
          Senha
        </button>
      </div>

      <div>
        {activeTab === "perfil" && (
          <motion.div
            key="perfil"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center gap-4">
              <UserAvatar firstName={userData.firstName} lastName={userData.lastName} className="h-24 w-24 text-4xl" />
              <button className="flex items-center justify-center text-sm text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                <Edit2 className="h-4 w-4 mr-2" />
                Alterar Foto
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-400">
                  Primeiro Nome
                </label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-400">
                  Sobrenome
                </label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-400">
                  Nome de Usuário
                </label>
                <input
                  id="username"
                  value={userData.username}
                  disabled
                  className="w-full p-3 rounded-md bg-gray-800/60 border border-white/10 text-gray-400 disabled:opacity-70"
                />
              </div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={handleProfileSubmit}
                disabled={isUpdating}
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar Alterações"
                )}
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "senha" && (
          <motion.div
            key="senha"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-gray-400"
              >
                Senha Atual
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-400"
              >
                Nova Senha
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-400"
              >
                Confirmar Nova Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={handlePasswordSubmit}
                disabled={isUpdating}
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  "Alterar Senha"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({
  progress,
  colorClass = "bg-purple-500",
}: {
  progress: number;
  colorClass?: string;
}) {
  return (
    <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className={`h-2.5 rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [myRanking, setMyRanking] = useState<Ranking | null>(null);
  const [totalSales, setTotalSales] = useState(0);
  const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);

  useEffect(() => {
    loadProfileData();
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const userDataResponse = await userService.getMyProfile();
      setUserData(userDataResponse);

      const activeComps = await competitionService.getActiveCompetitions();
      const competition = activeComps[0] || null;
      setActiveCompetition(competition);

      if (competition) {
        try {
          const myRank = await rankingService.getUserRanking(competition.id, user.userId);
          setMyRanking(myRank);
        } catch {
          setMyRanking(null);
        }

        try {
          const startDate = new Date(competition.startDate).toISOString().split('T')[0];
          const endDate = new Date(competition.endDate).toISOString().split('T')[0];
          const total = await salesService.getTotalSalesByUser(user.userId, startDate, endDate);
          setTotalSales(total);
        } catch {
          setTotalSales(0);
        }
      }

      try {
        const achievementsData = await achievementService.getUserAchievements();
        setAchievements(achievementsData.achievements);
      } catch (error) {
        console.error("Erro ao carregar conquistas:", error);
        setAchievements([]);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      toast.error("Erro ao carregar dados do perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (data: { firstName: string; lastName: string; email: string }) => {
    if (!user || !userData) return;

    try {
      setIsUpdating(true);
      const updatedUser = await userService.updateMyProfile(data);
      setUserData(updatedUser);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async (_data: { currentPassword: string; newPassword: string }) => {
    try {
      setIsUpdating(true);
      toast.success("Senha atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      toast.error("Erro ao atualizar senha");
    } finally {
      setIsUpdating(false);
    }
  };

  const competitionProgress = activeCompetition
    ? Math.min(
        100,
        ((Date.now() - new Date(activeCompetition.startDate).getTime()) /
          (new Date(activeCompetition.endDate).getTime() - new Date(activeCompetition.startDate).getTime())) *
          100
      )
    : 0;

  const monthlyGoal = 50;
  const nextLevelPoints = 5000;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Erro ao carregar dados do usuário</p>
      </div>
    );
  }

  return (
    <div className="w-full font-poppins">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
          <ProfileTabs
            userData={userData}
            onUpdateProfile={handleUpdateProfile}
            onUpdatePassword={handleUpdatePassword}
            isUpdating={isUpdating}
          />
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-100 mb-6">
              <Target className="h-5 w-5 text-purple-400" />
              Progresso e Objetivos
            </h3>
            <div className="space-y-6">
              {activeCompetition ? (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">
                        Progresso da Competição
                      </span>
                      <span className="text-sm font-medium text-gray-400">
                        {Math.round(competitionProgress)}%
                      </span>
                    </div>
                    <ProgressBar
                      progress={competitionProgress}
                      colorClass="bg-gradient-to-r from-purple-500 to-fuchsia-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">
                        Vendas do Mês
                      </span>
                      <span className="text-sm font-medium text-gray-400">
                        {totalSales} / {monthlyGoal}
                      </span>
                    </div>
                    <ProgressBar
                      progress={(totalSales / monthlyGoal) * 100}
                      colorClass="bg-gradient-to-r from-purple-500 to-fuchsia-500"
                    />
                  </div>
                  {myRanking && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">
                          Pontos para Próximo Nível
                        </span>
                        <span className="text-sm font-medium text-gray-400">
                          {myRanking.totalPoints} / {nextLevelPoints}
                        </span>
                      </div>
                      <ProgressBar
                        progress={(myRanking.totalPoints / nextLevelPoints) * 100}
                        colorClass="bg-gradient-to-r from-purple-500 to-fuchsia-500"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">Nenhuma competição ativa</p>
              )}
              <div className="pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-purple-400">
                      {myRanking?.position || "-"}º
                    </p>
                    <p className="text-xs text-gray-400">Posição</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-100">
                      {totalSales}
                    </p>
                    <p className="text-xs text-gray-400">Vendas</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-100">
                      {myRanking?.totalPoints || 0}
                    </p>
                    <p className="text-xs text-gray-400">Pontos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-100 mb-6">
              <Award className="h-5 w-5 text-purple-400" />
              Minhas Conquistas
            </h3>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {achievements.map((badge) => {
                  const IconComponent = iconMap[badge.iconType] || Award;
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`p-4 rounded-lg flex flex-col items-center justify-center text-center transition-all ${
                        badge.unlocked
                          ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-lg"
                          : "bg-gray-800/60"
                      }`}
                    >
                      <IconComponent
                        className={`h-10 w-10 mb-2 ${
                          badge.unlocked ? "text-white" : "text-gray-500 opacity-70"
                        }`}
                      />
                      <p
                        className={`font-bold text-sm ${
                          badge.unlocked ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {badge.title}
                      </p>
                      <p
                        className={`text-xs ${
                          badge.unlocked ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {badge.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">Nenhuma conquista disponível</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

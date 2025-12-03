import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Trophy,
  Award,
  BarChart3,
  ArrowUp,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import { competitionService } from "@/services/competitionService";
import { rankingService } from "@/services/rankingService";
import { salesService } from "@/services/salesService";
import type { User } from "@/dtos/UserDTOs";
import type { Competition } from "@/dtos/CompetitionDTOs";
import type { Ranking } from "@/dtos/RankingDTOs";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return "??";
  const f = firstName?.[0] || "";
  const l = lastName?.[0] || "";
  return `${f}${l}`.toUpperCase();
};

interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  totalSales: number;
  totalPoints: number;
  averagePoints: number;
  topPerformer: string;
  topPerformerPoints: number;
  growth: number;
}

export default function GerenteDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);
  const [topSellers, setTopSellers] = useState<Ranking[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats>({
    totalMembers: 0,
    activeMembers: 0,
    totalSales: 0,
    totalPoints: 0,
    averagePoints: 0,
    topPerformer: "-",
    topPerformerPoints: 0,
    growth: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const activeComps = await competitionService.getActiveCompetitions();
      const competition = activeComps[0] || null;
      setActiveCompetition(competition);

      const sellersResponse = await userService.getSellers({ page: 0, size: 100 });
      const sellers = sellersResponse.content;
      setTeamMembers(sellers);

      if (competition && sellers.length > 0) {
        const top = await rankingService.getTopRanking(competition.id, 10);
        setTopSellers(top);

        const totalPoints = top.reduce((sum, r) => sum + r.totalPoints, 0);
        const averagePoints = sellers.length > 0 ? Math.round(totalPoints / sellers.length) : 0;

        let totalSales = 0;
        try {
          const startDate = new Date(competition.startDate).toISOString().split('T')[0];
          const endDate = new Date(competition.endDate).toISOString().split('T')[0];

          const salesPromises = sellers.map(seller =>
            salesService.getTotalSalesByUser(seller.id, startDate, endDate).catch(() => 0)
          );
          const salesResults = await Promise.all(salesPromises);
          totalSales = salesResults.reduce((sum, count) => sum + count, 0);
        } catch (error) {
          console.error("Erro ao buscar vendas:", error);
        }

        const topPerformer = top[0];

        setTeamStats({
          totalMembers: sellers.length,
          activeMembers: sellers.length,
          totalSales,
          totalPoints,
          averagePoints,
          topPerformer: topPerformer ? topPerformer.user.username : "-",
          topPerformerPoints: topPerformer?.totalPoints || 0,
          growth: 12.5,
        });
      } else {
        setTeamStats({
          totalMembers: sellers.length,
          activeMembers: sellers.length,
          totalSales: 0,
          totalPoints: 0,
          averagePoints: 0,
          topPerformer: "-",
          topPerformerPoints: 0,
          growth: 0,
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const stats = [
    {
      title: "Membros da Equipe",
      value: teamStats.totalMembers,
      subtitle: `${teamStats.activeMembers} ativos`,
      icon: Users,
      color: "bg-blue-500",
      trend: `${teamStats.totalMembers} total`,
    },
    {
      title: "Total de Vendas",
      value: teamStats.totalSales,
      subtitle: "Este período",
      icon: TrendingUp,
      color: "bg-green-500",
      trend: `+${teamStats.growth}%`,
    },
    {
      title: "Pontos Totais",
      value: (teamStats.totalPoints || 0).toLocaleString(),
      subtitle: `Média: ${teamStats.averagePoints || 0}`,
      icon: Trophy,
      color: "bg-violet-500",
      trend: "Acima da meta",
    },
    {
      title: "Top Performer",
      value: teamStats.topPerformer,
      subtitle: `${(teamStats.topPerformerPoints || 0).toLocaleString()} pontos`,
      icon: Award,
      color: "bg-amber-500",
      trend: "1º lugar",
    },
  ];

  const competitionProgress = activeCompetition
    ? Math.min(
        100,
        Math.max(
          0,
          ((Date.now() - new Date(activeCompetition.startDate).getTime()) /
            (new Date(activeCompetition.endDate).getTime() - new Date(activeCompetition.startDate).getTime())) *
            100
        )
      )
    : 0;

  const daysRemaining = activeCompetition
    ? Math.max(
        0,
        Math.ceil((new Date(activeCompetition.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      )
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard do Gerente
        </h1>
        <p className="text-gray-400">
          Acompanhe a performance da sua equipe em tempo real
        </p>
      </motion.div>

      
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-400 text-sm font-medium mb-2">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-xs">{stat.subtitle}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-green-400 flex items-center gap-1">
                <ArrowUp className="w-3 h-3" />
                {stat.trend}
              </p>
            </div>
          </Card>
        ))}
      </motion.div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="bg-gray-800/50 border-gray-700 p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-violet-500 p-2 rounded-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Competição Ativa
                </h3>
                <p className="text-sm text-gray-400">Status atual</p>
              </div>
            </div>

            {activeCompetition ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {activeCompetition.name}
                  </h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    ATIVA
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Participantes</span>
                    <span className="text-white font-semibold">
                      {teamStats.totalMembers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Dias restantes</span>
                    <span className="text-white font-semibold">
                      {daysRemaining}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Término</span>
                    <span className="text-white font-semibold">
                      {new Date(activeCompetition.endDate).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Progresso</span>
                    <span>{Math.round(competitionProgress)}%</span>
                  </div>
                  <Progress value={competitionProgress} className="h-2" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Trophy className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-gray-400 text-sm">Nenhuma competição ativa</p>
              </div>
            )}
          </Card>
        </motion.div>

        
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-gray-800/50 border-gray-700 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Top 5 Vendedores
                  </h3>
                  <p className="text-sm text-gray-400">
                    Melhores da competição
                  </p>
                </div>
              </div>
            </div>

            {topSellers.length > 0 ? (
              <div className="space-y-3">
                {topSellers.slice(0, 5).map((seller) => (
                  <div
                    key={seller.id}
                    className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            seller.position === 1
                              ? "bg-amber-500 text-white"
                              : seller.position === 2
                              ? "bg-gray-400 text-white"
                              : seller.position === 3
                              ? "bg-orange-600 text-white"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {seller.position}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {seller.user.username.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {seller.user.username}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(seller.totalPoints || 0).toLocaleString()} pts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-white font-bold">
                          {(seller.totalPoints || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">pontos</p>
                      </div>
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-gray-400 text-sm">Nenhum ranking disponível</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Membros da Equipe
              </h3>
              <p className="text-sm text-gray-400">
                Total de {teamMembers.length} vendedores
              </p>
            </div>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.slice(0, 6).map((member) => (
                <div
                  key={member.id}
                  className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {getInitials(member.firstName, member.lastName)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {member.firstName && member.lastName
                          ? `${member.firstName} ${member.lastName}`
                          : member.username}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        {member.email}
                      </p>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        {member.roles[0]?.name || 'SELLER'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Users className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm">Nenhum membro na equipe</p>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}

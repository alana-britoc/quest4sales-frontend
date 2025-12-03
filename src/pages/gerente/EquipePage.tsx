import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Trophy,
  TrendingUp,
  Mail,
  BarChart3,
  Loader2,
} from "lucide-react";
import { userService } from "@/services/userService";
import { competitionService } from "@/services/competitionService";
import { rankingService } from "@/services/rankingService";
import { salesService } from "@/services/salesService";
import type { User } from "@/dtos/UserDTOs";
import type { Competition } from "@/dtos/CompetitionDTOs";
import type { Ranking } from "@/dtos/RankingDTOs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface TeamMemberData {
  user: User;
  ranking: Ranking | null;
  totalSales: number;
  performance: number;
}

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return "??";
  const f = firstName?.[0] || "";
  const l = lastName?.[0] || "";
  return `${f}${l}`.toUpperCase();
};

const getPerformanceColor = (performance: number) => {
  if (performance >= 90) return "text-green-400";
  if (performance >= 75) return "text-blue-400";
  if (performance >= 60) return "text-yellow-400";
  return "text-red-400";
};

export default function EquipePage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);

      const activeComps = await competitionService.getActiveCompetitions();
      const competition = activeComps[0] || null;
      setActiveCompetition(competition);

      const sellersResponse = await userService.getSellers({ page: 0, size: 100 });
      const sellers = sellersResponse.content;

      if (!competition) {
        const membersData = sellers.map((seller) => ({
          user: seller,
          ranking: null,
          totalSales: 0,
          performance: 0,
        }));
        setTeamMembers(membersData);
        setLoading(false);
        return;
      }

      const rankings = await rankingService.getRankingsByCompetition(competition.id);

      const startDate = new Date(competition.startDate).toISOString().split('T')[0];
      const endDate = new Date(competition.endDate).toISOString().split('T')[0];

      const membersDataPromises = sellers.map(async (seller) => {
        const sellerRanking = rankings.find((r) => r.user.id === seller.id) || null;

        let totalSales = 0;
        try {
          totalSales = await salesService.getTotalSalesByUser(seller.id, startDate, endDate);
        } catch {
          totalSales = 0;
        }

        let performance = 0;
        if (sellerRanking && rankings.length > 0) {
          performance = Math.round(100 - ((sellerRanking.position - 1) / rankings.length) * 50);
        }

        return {
          user: seller,
          ranking: sellerRanking,
          totalSales,
          performance,
        };
      });

      const membersData = await Promise.all(membersDataPromises);

      membersData.sort((a, b) => {
        if (!a.ranking) return 1;
        if (!b.ranking) return -1;
        return a.ranking.position - b.ranking.position;
      });

      setTeamMembers(membersData);
    } catch (error) {
      console.error("Erro ao carregar equipe:", error);
      toast.error("Erro ao carregar dados da equipe");
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.user.username.toLowerCase().includes(searchLower) ||
      member.user.email.toLowerCase().includes(searchLower) ||
      (member.user.firstName && member.user.firstName.toLowerCase().includes(searchLower)) ||
      (member.user.lastName && member.user.lastName.toLowerCase().includes(searchLower))
    );
  });

  const totalSales = teamMembers.reduce((sum, m) => sum + m.totalSales, 0);
  const totalPoints = teamMembers.reduce((sum, m) => sum + (m.ranking?.totalPoints || 0), 0);
  const avgPerformance = teamMembers.length > 0
    ? teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length
    : 0;

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
        <h1 className="text-3xl font-bold text-white mb-2">Minha Equipe</h1>
        <p className="text-gray-400">
          Acompanhe o desempenho individual de cada membro
        </p>
      </motion.div>

      
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Membros</p>
              <h3 className="text-2xl font-bold text-white">
                {teamMembers.length}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Vendas</p>
              <h3 className="text-2xl font-bold text-white">{totalSales}</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-violet-500 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Pontos</p>
              <h3 className="text-2xl font-bold text-white">
                {(totalPoints || 0).toLocaleString()}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Performance Média</p>
              <h3 className="text-2xl font-bold text-white">
                {Math.round(avgPerformance)}%
              </h3>
            </div>
          </div>
        </Card>
      </motion.div>

      
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar membro por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-700 text-white"
            />
          </div>
        </Card>
      </motion.div>

      
      {filteredMembers.length > 0 ? (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredMembers.map((member) => {
            const displayName =
              member.user.firstName && member.user.lastName
                ? `${member.user.firstName} ${member.user.lastName}`
                : member.user.username;

            return (
              <Card
                key={member.user.id}
                className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-all"
              >
                <div className="space-y-4">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {getInitials(member.user.firstName, member.user.lastName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white truncate">
                          {displayName}
                        </h3>
                        {member.ranking && (
                          <Badge
                            className={`${
                              member.ranking.position <= 3
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                : "bg-gray-600/20 text-gray-400 border-gray-600/30"
                            }`}
                          >
                            #{member.ranking.position}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{member.user.email}</span>
                      </div>
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Pontos</p>
                      <p className="text-white font-bold text-lg">
                        {(member.ranking?.totalPoints || 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Vendas</p>
                      <p className="text-white font-bold text-lg">{member.totalSales}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Role</p>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        {member.user.roles[0]?.name || "SELLER"}
                      </Badge>
                    </div>
                  </div>

                  
                  {activeCompetition && member.performance > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Performance</span>
                        <span
                          className={`font-bold ${getPerformanceColor(
                            member.performance
                          )}`}
                        >
                          {member.performance}%
                        </span>
                      </div>
                      <Progress value={member.performance} className="h-2" />
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <Card className="bg-gray-800/50 border-gray-700 p-12">
            <div className="text-center text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                {searchTerm
                  ? "Nenhum membro encontrado"
                  : "Nenhum membro na equipe"}
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {!activeCompetition && teamMembers.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="bg-orange-500/10 border-orange-500/30 p-4">
            <p className="text-orange-400 text-sm text-center">
              Nenhuma competição ativa. Os dados de performance e ranking não estão disponíveis.
            </p>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

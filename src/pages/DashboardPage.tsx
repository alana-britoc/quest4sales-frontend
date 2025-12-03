import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Calendar, Trophy, Bell, X, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { competitionService } from "@/services/competitionService";
import { rankingService } from "@/services/rankingService";
import { notificationService } from "@/services/notificationService";
import type { Competition } from "@/dtos/CompetitionDTOs";
import type { Ranking } from "@/dtos/RankingDTOs";
import type { Notification } from "@/dtos/NotificationDTOs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

function AnimatedCounter({ to }: { to: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [to, count]);

  return <motion.span>{rounded}</motion.span>;
}

function ProgressBar({ progress, colorClass = "bg-purple-500" }: { progress: number; colorClass?: string }) {
  return (
    <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className={`h-2.5 rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);
  const [topRanking, setTopRanking] = useState<Ranking[]>([]);
  const [myRanking, setMyRanking] = useState<Ranking | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showFullRanking, setShowFullRanking] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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

      if (competition) {
        const top = await rankingService.getTopRanking(competition.id, 10);
        setTopRanking(top);

        try {
          const myRank = await rankingService.getUserRanking(competition.id, user.userId);
          setMyRanking(myRank);
        } catch {
          setMyRanking(null);
        }
      }

      const notifs = await notificationService.getNotificationsByUser(user.userId);
      setNotifications(notifs);

      const count = await notificationService.getUnreadCount(user.userId);
      setUnreadCount(count);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Erro ao marcar notificação:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      await notificationService.markAllAsRead(user.userId);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("Todas as notificações foram marcadas como lidas");
    } catch (error) {
      console.error("Erro ao marcar todas:", error);
    }
  };

  const podium = topRanking.slice(0, 3);
  const daysRemaining = activeCompetition
    ? Math.max(
        0,
        Math.ceil((new Date(activeCompetition.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      )
    : 0;

  const competitionProgress = activeCompetition
    ? Math.min(
        100,
        ((Date.now() - new Date(activeCompetition.startDate).getTime()) /
          (new Date(activeCompetition.endDate).getTime() - new Date(activeCompetition.startDate).getTime())) *
          100
      )
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!activeCompetition) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <Trophy className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Nenhuma Competição Ativa</h2>
        <p className="text-gray-400">Aguarde o início de uma nova competição!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101015] text-white font-poppins p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Olá, {user?.username}!</h1>
            <p className="text-gray-400">Acompanhe seu desempenho na competição</p>
          </div>
          <Button
            onClick={() => setShowNotifications(true)}
            className="relative bg-gray-800 hover:bg-gray-700"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        
        <Card className="bg-gradient-to-br from-violet-600 to-purple-700 p-6 border-0">
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-white" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{activeCompetition.name}</h2>
              <p className="text-white/80">{activeCompetition.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-white/90">
                  <span>Progresso da Competição</span>
                  <span>{Math.round(competitionProgress)}%</span>
                </div>
                <ProgressBar progress={competitionProgress} colorClass="bg-white" />
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span>{daysRemaining} dias restantes</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        
        {myRanking && (
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Sua Posição</p>
                <h3 className="text-4xl font-bold text-white">{myRanking.position}º</h3>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Seus Pontos</p>
                <h3 className="text-4xl font-bold text-violet-400">
                  <AnimatedCounter to={myRanking.totalPoints} />
                </h3>
              </div>
            </div>
          </Card>
        )}

        
        {podium.length > 0 && (
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-6">Top 3 - Pódio</h3>
            <div className="grid grid-cols-3 gap-4">
              {[podium[1], podium[0], podium[2]].map((seller, idx) => {
                if (!seller) return null;
                const realPosition = idx === 1 ? 1 : idx === 0 ? 2 : 3;
                const heights = ["h-32", "h-40", "h-28"];
                const colors = ["bg-gray-400", "bg-amber-500", "bg-orange-600"];

                return (
                  <motion.div
                    key={seller.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {seller.user.username.substring(0, 2).toUpperCase()}
                    </div>
                    <p className="font-semibold text-sm mb-1">
                      {seller.user.username}
                    </p>
                    <p className="text-violet-400 font-bold text-lg mb-2">
                      {(seller.totalPoints || 0).toLocaleString()}
                    </p>
                    <div className={`${heights[idx]} ${colors[realPosition - 1]} w-full rounded-t-lg flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">{realPosition}º</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        )}

        
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Ranking Geral</h3>
            <Button
              onClick={() => setShowFullRanking(true)}
              variant="outline"
              size="sm"
              className="border-gray-700"
            >
              Ver Completo
            </Button>
          </div>
          <div className="space-y-3">
            {topRanking.slice(0, 5).map((seller) => (
              <div
                key={seller.id}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  seller.user.id === user?.userId ? "bg-violet-500/20 border border-violet-500" : "bg-gray-900/50"
                }`}
              >
                <div className="text-2xl font-bold text-gray-400 w-8">{seller.position}º</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {seller.user.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">
                    {seller.user.username}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-violet-400">{(seller.totalPoints || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">pontos</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      
      {showFullRanking && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Ranking Completo</h2>
              <Button onClick={() => setShowFullRanking(false)} variant="ghost" size="sm">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {topRanking.map((seller) => (
                <div
                  key={seller.id}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    seller.user.id === user?.userId ? "bg-violet-500/20" : "bg-gray-900/50"
                  }`}
                >
                  <div className="text-xl font-bold w-8">{seller.position}º</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {seller.user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {seller.user.username}
                    </p>
                  </div>
                  <p className="font-bold text-violet-400">{(seller.totalPoints || 0).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      
      {showNotifications && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Notificações</h2>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button onClick={markAllAsRead} variant="outline" size="sm">
                    Marcar todas como lidas
                  </Button>
                )}
                <Button onClick={() => setShowNotifications(false)} variant="ghost" size="sm">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Nenhuma notificação</p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg ${
                      notif.isRead ? "bg-gray-900/50" : "bg-violet-500/20 border border-violet-500"
                    }`}
                    onClick={() => !notif.isRead && markNotificationAsRead(notif.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{notif.title}</p>
                        <p className="text-sm text-gray-400">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notif.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      {!notif.isRead && (
                        <Badge className="bg-violet-500 ml-2">Nova</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

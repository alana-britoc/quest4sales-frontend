import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  Calendar,
  Star,
  Award,
  Trophy,
  Bell,
  Zap,
  X,
} from "lucide-react";

type PodiumDataItem = {
  position: number;
  name: string;
  total_points: number;
};

type Seller = {
  position: number;
  user_id: number;
  name: string;
  total_points: number;
};

type NotificationType = "MUDANCA_POSICAO" | "AVISO" | "PREMIACAO";

const MOCK_USER = {
  name: "Você",
  id: 6,
};

const MOCK_COMPETITION = {
  id: 1,
  name: "Batalha de Verão",
};

const MOCK_PRIZE = {
  titulo: "Férias no Caribe",
  descricao: "Conquiste o primeiro lugar e ganhe uma viagem exclusiva.",
  dataFim: new Date("2025-09-25T00:00:00"),
  progress: 75,
};

const MOCK_PODIUM: PodiumDataItem[] = [
  { position: 1, name: "Paul", total_points: 5075 },
  { position: 2, name: "Derrick", total_points: 4985 },
  { position: 3, name: "Kelsey", total_points: 4642 },
];

const MOCK_RANKING = {
  competicao_id: 1,
  allSellers: [
    { position: 1, user_id: 1, name: "Paul C. Ramos", total_points: 5075 },
    { position: 2, user_id: 2, name: "Derrick L. Thoman", total_points: 4985 },
    { position: 3, user_id: 3, name: "Kelsey T. Donovan", total_points: 4642 },
    { position: 4, user_id: 4, name: "Jack L. Gregory", total_points: 3874 },
    { position: 5, user_id: 5, name: "Mary R. Mercado", total_points: 3567 },
    { position: 6, user_id: 6, name: MOCK_USER.name, total_points: 3478 },
    { position: 7, user_id: 7, name: "Theresa N. Meki", total_points: 3356 },
    { position: 8, user_id: 8, name: "James R. Stokes", total_points: 3250 },
    { position: 9, user_id: 9, name: "David B. Rodriguez", total_points: 3150 },
    { position: 10, user_id: 10, name: "Ana F. Costa", total_points: 3050 },
  ],
};

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    tipo: "MUDANCA_POSICAO",
    mensagem: "Você ultrapassou Theresa N. Meki e agora está em 6º lugar!",
    lida: false,
  },
  {
    id: 2,
    tipo: "AVISO",
    mensagem: "A competição 'Batalha de Verão' termina em 34 dias.",
    lida: false,
  },
  {
    id: 3,
    tipo: "PREMIACAO",
    mensagem: "Parabéns! Você ganhou um bônus de 100 pontos por 5 vendas seguidas.",
    lida: true,
  },
];

const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length === 1) {
    return name[0]?.toUpperCase() || "";
  }
  return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
};

function UserAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = getInitials(name);
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-700 ${className}`}
    >
      <span className="font-bold text-white">{initials}</span>
    </div>
  );
}

function AnimatedCounter({ to }: { to: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [to, count]);

  return <motion.span>{rounded}</motion.span>;
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
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
}

function PodiumCard({ podiumData }: { podiumData: PodiumDataItem[] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex flex-col rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B] overflow-hidden"
    >
      <div className="flex items-center gap-2 p-5 border-b border-white/10">
        <Trophy className="h-5 w-5 text-[#ff9d00]" />
        <h3 className="text-[#ff9d00] font-bold text-base [text-shadow:0_0_5px_#ff9d00]">
          PÓDIO DA TEMPORADA
        </h3>
      </div>
      <div className="relative flex items-center justify-center py-10">
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-purple-900/30 to-transparent blur-3xl" />
        <div className="flex w-full items-end justify-center gap-0 z-10">
          <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            className="flex flex-[0.9] justify-center"
          >
            <PodiumSpot
              position={2}
              name={podiumData[1].name}
              points={podiumData[1].total_points}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -6 }}
            animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="z-20 flex flex-[1.2] -translate-y-4 justify-center"
          >
            <PodiumSpot
              position={1}
              name={podiumData[0].name}
              points={podiumData[0].total_points}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            className="flex flex-[0.9] justify-center"
          >
            <PodiumSpot
              position={3}
              name={podiumData[2].name}
              points={podiumData[2].total_points}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function PodiumSpot({
  position,
  name,
  points,
}: {
  position: 1 | 2 | 3;
  name: string;
  points: number;
}) {
  const isFirst = position === 1;

  const pedestalClasses =
    position === 1
      ? "bg-gradient-to-b from-yellow-400 to-yellow-600 border-b-4 border-yellow-800"
      : position === 2
      ? "bg-gradient-to-b from-gray-300 to-gray-500 border-b-4 border-gray-700"
      : "bg-gradient-to-b from-orange-400 to-orange-600 border-b-4 border-orange-800";

  const avatarBorder =
    position === 1
      ? "border-[#FFD700]"
      : position === 2
      ? "border-[#c0c0c0]"
      : "border-[#cd7f32]";

  const badgeColor =
    position === 1
      ? "bg-[#FFD700]"
      : position === 2
      ? "bg-[#c0c0c0]"
      : "bg-[#cd7f32]";

  const textColor = position === 1 ? "text-yellow-900" : "text-gray-900";

  return (
    <div
      className={`flex flex-col items-center relative ${
        isFirst ? "-translate-y-4" : ""
      }`}
    >
      <div className="relative mb-4">
        <div
          className={`relative rounded-full border-4 ${avatarBorder} overflow-hidden flex items-center justify-center ${
            isFirst ? "h-28 w-28" : "h-24 w-24"
          } bg-gray-800 p-1`}
        >
          <UserAvatar
            name={name}
            className="h-full w-full text-3xl md:text-4xl"
          />
        </div>
        {isFirst && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#FFD700]">
            <Star className="h-7 w-7" fill="currentColor" />
          </div>
        )}
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-black ${badgeColor} shadow-md`}
        >
          {position}
        </div>
      </div>
      <div
        className={`w-32 rounded-t-lg flex flex-col items-center justify-end pt-6 pb-3 shadow-inner ${pedestalClasses} ${
          isFirst ? "h-40" : position === 2 ? "h-32" : "h-28"
        }`}
      >
        <p className={`font-semibold text-xs ${textColor}`}>{name}</p>
        <p className={`font-bold mt-1 text-sm ${textColor}`}>
          <AnimatedCounter to={points} />
        </p>
      </div>
    </div>
  );
}

function PrizeCard() {
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (MOCK_PRIZE.dataFim.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -5 }}
      className="relative rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B] overflow-hidden flex flex-col md:flex-row"
    >
      <div className="w-full md:w-2/5 h-48 md:h-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#700089] to-[#d44e00] opacity-80" />
        <div className="absolute inset-0 h-full w-full bg-black/20 flex items-center justify-center font-bold text-3xl tracking-wider text-white backdrop-blur-sm md:backdrop-blur-none">
          <span className="md:hidden">{MOCK_PRIZE.titulo}</span>
        </div>
      </div>

      <div className="flex flex-col p-5 w-full md:w-3/5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-100 hidden md:block">
            {MOCK_PRIZE.titulo}
          </h3>
          <span className="text-xs font-medium text-purple-400 bg-purple-900/50 px-2 py-0.5 rounded">
            Prêmio Principal
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-400">{MOCK_PRIZE.descricao}</p>
        <div className="flex-grow" />
        <div className="mt-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-gray-400">
            Termina em {daysRemaining} dias
          </span>
        </div>
        <div className="mt-3 w-full">
          <ProgressBar
            progress={MOCK_PRIZE.progress}
            colorClass="bg-gradient-to-r from-[#a855f7] to-[#f4a351]"
          />
        </div>
      </div>
    </motion.div>
  );
}

function RankingCard({ onShowAllClick }: { onShowAllClick: () => void }) {
  const userRankData = MOCK_RANKING.allSellers.find(
    (s) => s.user_id === MOCK_USER.id
  );
  const topSellers = MOCK_RANKING.allSellers.slice(0, 5);

  return (
    <div className="rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
      <div className="p-5 border-b border-white/10">
        <h3 className="text-lg font-bold text-gray-100">
          Classificação: {MOCK_COMPETITION.name}
        </h3>
        {userRankData && (
          <div className="flex items-center gap-4 mt-4 bg-purple-900/50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-purple-300">
              {userRankData.position}º
            </div>
            <div>
              <p className="font-semibold text-white">Essa é sua posição!</p>
              <p className="text-xs text-gray-400">
                Continue assim para ficar no pódio!
              </p>
            </div>
            <Award className="h-10 w-10 text-purple-300 ml-auto" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">
          LÍDERES DA COMPETIÇÃO
        </h4>
        <div className="space-y-3">
          {topSellers.map((seller) => (
            <div
              key={seller.position}
              className={`flex items-center gap-3 p-2 rounded-md ${
                seller.user_id === MOCK_USER.id ? "bg-purple-800/60" : ""
              }`}
            >
              <div className="font-bold text-gray-300 w-5">
                {seller.position}
              </div>
              <img
                src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seller.name}`}
                alt={seller.name}
                className="h-8 w-8 rounded-full bg-gray-700 p-1"
              />
              <p className="flex-1 text-sm font-medium text-gray-200">
                {seller.name}
              </p>
              <span className="text-sm font-bold text-purple-400">
                {seller.total_points}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onShowAllClick}
          className="w-full mt-5 bg-purple-600/50 text-purple-300 font-semibold py-2 rounded-lg border border-purple-500 hover:bg-purple-600/80 hover:text-white transition-all"
        >
          Ver Classificação Completa
        </button>
      </div>
    </div>
  );
}

function NotificationsCard() {
  const [notifications] = useState(MOCK_NOTIFICATIONS);

  const getIcon = (tipo: NotificationType) => {
    switch (tipo) {
      case "MUDANCA_POSICAO":
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case "PREMIACAO":
        return <Award className="w-5 h-5 text-purple-400" />;
      case "AVISO":
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <h3 className="text-lg font-bold text-gray-100">Notificações</h3>
        <span className="text-xs font-medium text-gray-400 hover:text-white cursor-pointer">
          Limpar tudo
        </span>
      </div>
      <div className="p-5 space-y-4 max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                  notif.lida ? "bg-gray-700/50" : "bg-gray-700"
                }`}
              >
                {getIcon(notif.tipo as NotificationType)}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    notif.lida ? "text-gray-500" : "text-gray-200"
                  }`}
                >
                  {notif.mensagem}
                </p>
              </div>
              {!notif.lida && (
                <div className="flex-shrink-0 h-2 w-2 bg-purple-400 rounded-full mt-2.5"></div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            Você não tem novas notificações.
          </p>
        )}
      </div>
    </div>
  );
}

function RankingModal({
  show,
  onClose,
  rankingData,
}: {
  show: boolean;
  onClose: () => void;
  rankingData: Seller[];
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl bg-[#1F1F2B] border border-white/10 rounded-2xl shadow-lg flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                Classificação Completa
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              <div className="space-y-2">
                {rankingData.map((seller) => (
                  <div
                    key={seller.position}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      seller.user_id === MOCK_USER.id
                        ? "bg-purple-800/60 border border-purple-500"
                        : "bg-gray-800/30"
                    }`}
                  >
                    <div className="font-bold text-gray-300 w-8 text-center text-lg">
                      {seller.position}
                    </div>
                    <img
                      src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seller.name}`}
                      alt={seller.name}
                      className="h-10 w-10 rounded-full bg-gray-700 p-1"
                    />
                    <p className="flex-1 text-base font-medium text-gray-200">
                      {seller.name}
                    </p>
                    <span className="text-lg font-bold text-purple-400">
                      <AnimatedCounter to={seller.total_points} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DashboardPage() {
  const [showRankingModal, setShowRankingModal] = useState(false);

  return (
    <div className="w-full font-poppins">
      <motion.div
        className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6 lg:w-2/3">
          <PodiumCard podiumData={MOCK_PODIUM} />
          <PrizeCard />
        </div>

        <div className="flex flex-col gap-6 lg:w-1/3">
          <RankingCard onShowAllClick={() => setShowRankingModal(true)} />
          <NotificationsCard />
        </div>
      </motion.div>

      <RankingModal
        show={showRankingModal}
        onClose={() => setShowRankingModal(false)}
        rankingData={MOCK_RANKING.allSellers}
      />
    </div>
  );
}
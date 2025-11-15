import { useState } from "react";
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
} from "lucide-react";

const mockUserData = {
  name: "João Santos",
  email: "joao.santos@empresa.pt",
  department: "Vendas - Região Norte",
  avatarFallback: "JS",
};

const mockStatsData = {
  position: 6,
  sales: 45,
  points: 3478,
};

const mockProgressData = [
  { id: 1, label: "Vendas do Mês", current: 45, total: 50 },
  { id: 2, label: "Meta Trimestral", current: 127, total: 150 },
  { id: 3, label: "Pontos para Próximo Nível", current: 3478, total: 3500 },
];

const mockAchievementsData = [
  {
    id: 1,
    icon: Crown,
    title: "Rei das Vendas",
    desc: "1º lugar do mês",
    unlocked: true,
  },
  {
    id: 2,
    icon: Flame,
    title: "Em Chamas",
    desc: "5 vendas seguidas",
    unlocked: true,
  },
  {
    id: 3,
    icon: Star,
    title: "Estrela Nascente",
    desc: "Meta mensal atingida",
    unlocked: true,
  },
  {
    id: 4,
    icon: Zap,
    title: "Vendedor Relâmpago",
    desc: "10 vendas em 1 dia",
    unlocked: false,
  },
  {
    id: 5,
    icon: Target,
    title: "Mestre das Metas",
    desc: "Bateu a meta trimestral",
    unlocked: false,
  },
  {
    id: 6,
    icon: Award,
    title: "Novato do Ano",
    desc: "Top 10 no primeiro mês",
    unlocked: false,
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

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("perfil");

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
              <UserAvatar name={mockUserData.name} className="h-24 w-24 text-4xl" />
              <button className="flex items-center justify-center text-sm text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                <Edit2 className="h-4 w-4 mr-2" />
                Alterar Foto
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">
                  Nome Completo
                </label>
                <input
                  id="name"
                  defaultValue={mockUserData.name}
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
                  defaultValue={mockUserData.email}
                  className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="department"
                  className="text-sm font-medium text-gray-400"
                >
                  Departamento
                </label>
                <input
                  id="department"
                  defaultValue={mockUserData.department}
                  disabled
                  className="w-full p-3 rounded-md bg-gray-800/60 border border-white/10 text-gray-400 disabled:opacity-70"
                />
              </div>
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
                className="w-full p-3 rounded-md bg-white/5 border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </motion.div>
        )}

        <div className="pt-6 border-t border-white/10">
          <button className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors">
            Guardar Alterações
          </button>
        </div>
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
  return (
    <div className="w-full font-poppins">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
          <ProfileTabs />
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-100 mb-6">
              <Target className="h-5 w-5 text-purple-400" />
              Progresso e Objetivos
            </h3>
            <div className="space-y-6">
              <div className="space-y-5">
                {mockProgressData.map((progress) => {
                  const percentage = (progress.current / progress.total) * 100;
                  return (
                    <div key={progress.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">
                          {progress.label}
                        </span>
                        <span className="text-sm font-medium text-gray-400">
                          {progress.current} / {progress.total}
                        </span>
                      </div>
                      <ProgressBar
                        progress={percentage}
                        colorClass="bg-gradient-to-r from-purple-500 to-fuchsia-500"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-purple-400">
                      {mockStatsData.position}º
                    </p>
                    <p className="text-xs text-gray-400">Posição</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-100">
                      {mockStatsData.sales}
                    </p>
                    <p className="text-xs text-gray-400">Vendas</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-100">
                      {mockStatsData.points}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockAchievementsData.map((badge) => (
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
                  <badge.icon
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
                    {badge.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
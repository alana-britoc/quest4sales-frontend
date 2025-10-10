import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Edit2, Target, Award, Star, Crown, Flame, Zap } from "lucide-react";

const mockUserData = {
  name: "João Santos",
  email: "joao.santos@empresa.pt",
  department: "Vendas - Região Norte",
  avatarSeed: "Joao Santos",
  avatarFallback: "JS",
};

const mockStatsData = {
  position: 1,
  sales: 45,
  points: 2890,
};

const mockProgressData = [
  { id: 1, label: "Vendas do Mês", current: 45, total: 50 },
  { id: 2, label: "Meta Trimestral", current: 127, total: 150 },
  { id: 3, label: "Pontos para Próximo Nível", current: 2890, total: 3500 },
];

const mockAchievementsData = [
  { id: 1, icon: Crown, title: "Rei das Vendas", desc: "1º lugar do mês", unlocked: true },
  { id: 2, icon: Flame, title: "Em Chamas", desc: "5 vendas seguidas", unlocked: true },
  { id: 3, icon: Star, title: "Estrela Nascente", desc: "Meta mensal atingida", unlocked: true },
  { id: 4, icon: Zap, title: "Vendedor Relâmpago", desc: "10 vendas em 1 dia", unlocked: false },
];

const Perfil = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col">
        <Card className="bg-[#1F1F2B] border border-white/10 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#ff9d00] [text-shadow:0_0_5px_#ff9d00]">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4 pt-4">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px #ff9d00",
                    "0 0 25px #ff9d00",
                    "0 0 15px #ff9d00",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full"
              >
                <Avatar className="h-24 w-24 border-4 border-[#ff9d00]">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${mockUserData.avatarSeed}`} alt="User avatar" />
                  <AvatarFallback className="bg-gradient-to-br from-[#a855f7] to-[#f4a351] text-white text-2xl font-bold">
                    {mockUserData.avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                <Edit2 className="h-4 w-4 mr-2" />
                Alterar Foto
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-400">Nome Completo</Label>
                <Input id="name" defaultValue={mockUserData.name} className="bg-gray-900/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400">Email</Label>
                <Input id="email" type="email" defaultValue={mockUserData.email} className="bg-gray-900/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-400">Departamento</Label>
                <Input id="department" defaultValue={mockUserData.department} disabled className="bg-gray-900/50 border-white/10 disabled:opacity-60" />
              </div>
              <Button className="w-full bg-gradient-to-r from-[#a855f7] to-[#f4a351] text-white font-bold hover:opacity-90 transition-opacity">
                Guardar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card className="bg-[#1F1F2B] border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#ff9d00] [text-shadow:0_0_5px_#ff9d00]">
              <Target className="h-5 w-5" />
              Progresso e Objetivos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {mockProgressData.map((progress, index) => {
                const percentage = (progress.current / progress.total) * 100;
                return (
                  <div key={progress.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">{progress.label}</span>
                      <span className="text-sm font-medium text-gray-400">{progress.current} / {progress.total}</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                      <motion.div 
                        className="bg-gradient-to-r from-[#a855f7] to-[#f4a351] h-2.5 rounded-full" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="pt-6 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-[#ff9d00] [text-shadow:0_0_5px_#ff9d00]">{mockStatsData.position}º</p>
                  <p className="text-xs text-gray-400">Posição</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-100">{mockStatsData.sales}</p>
                  <p className="text-xs text-gray-400">Vendas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-[#a855f7] to-[#f4a351] bg-clip-text text-transparent">{mockStatsData.points}</p>
                  <p className="text-xs text-gray-400">Pontos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1F1F2B] border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#ff9d00] [text-shadow:0_0_5px_#ff9d00]">
              <Award className="h-5 w-5" />
              Minhas Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockAchievementsData.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05, y: -5, rotateZ: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center text-center ${badge.unlocked ? 'bg-gradient-to-br from-[#a855f7] to-[#f4a351]' : 'bg-gray-800/60'}`}
                >
                  <badge.icon className={`h-8 w-8 mb-2 ${badge.unlocked ? 'text-white' : 'text-gray-500'}`} />
                  <p className={`font-bold text-sm ${badge.unlocked ? 'text-white' : 'text-gray-400'}`}>{badge.title}</p>
                  <p className={`text-xs ${badge.unlocked ? 'text-white/80' : 'text-gray-500'}`}>{badge.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Perfil;
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Calendar, Star, MessageSquare, Medal } from "lucide-react";

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

function PodiumCard({ position, name, points }: { position: 1 | 2 | 3; name: string; points: number; }) {
  const isFirst = position === 1;
  const podiumColor = isFirst ? "bg-[#581c87]" : "bg-[#2d2d3f]";
  const borderColor = position === 1 ? "border-[#FFD700]" : position === 2 ? "border-[#c0c0c0]" : "border-[#cd7f32]";
  const badgeColor = position === 1 ? "bg-[#FFD700]" : position === 2 ? "bg-[#c0c0c0]" : "bg-[#cd7f32]";
  const pointsColor = position === 1 ? "text-[#FFD700]" : position === 2 ? "text-[#c0c0c0]" : "text-[#cd7f32]";

  return (
    <div className={`flex flex-col items-center relative ${isFirst ? "-translate-y-4" : ""}`}>
      <div className="relative mb-4">
        <div className={`rounded-full border-4 ${borderColor} overflow-hidden flex items-center justify-center ${isFirst ? "h-24 w-24" : "h-20 w-20"} bg-gray-800 p-1`}>
          <img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${name}`} alt={name} className="h-full w-full object-cover" />
        </div>
        {isFirst && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#FFD700]"><Star className="h-7 w-7" fill="currentColor" /></div>}
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-black ${badgeColor} shadow-md`}>{position}</div>
      </div>
      <div className={`w-28 rounded-t-2xl flex flex-col items-center justify-end pt-6 pb-3 ${podiumColor} ${isFirst ? "h-40" : position === 2 ? "h-32" : "h-28"}`}>
        <p className="text-white font-semibold text-xs">{name}</p>
        <p className={`font-bold mt-1 text-sm ${pointsColor}`}>
          <AnimatedCounter to={points} />
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const topSellers = [ { position: 1, name: "Paul", points: 5075 }, { position: 2, name: "Derrick", points: 4985 }, { position: 3, name: "Kelsey", points: 4642 }, ];
  const engagementRanking = [ { rank: 1, name: "Carla Mendes", actions: 312 }, { rank: 2, name: "Rafael Torres", actions: 298 }, { rank: 3, name: "Bianca Silva", actions: 287 }, { rank: 4, name: "Lucas Prado", actions: 271 }, { rank: 5, name: "Fernanda Costa", actions: 263 }, ];
  const maxEngagement = engagementRanking.length ? Math.max(...engagementRanking.map((e) => e.actions)) : 1;
  const allSellers = [ { position: 1, name: "Paul C. Ramos", points: 5075, sales: 45, trend: "up" }, { position: 2, name: "Derrick L. Thoman", points: 4985, sales: 38, trend: "up" }, { position: 3, name: "Kelsey T. Donovan", points: 4642, sales: 32, trend: "same" }, { position: 4, name: "Jack L. Gregory", points: 3874, sales: 29, trend: "down" }, { position: 5, name: "Mary R. Mercado", points: 3567, sales: 26, trend: "up" }, { position: 6, name: "Theresa N. Meki", points: 3478, sales: 24, trend: "up" }, { position: 7, name: "Jack L. Gregory", points: 3356, sales: 21, trend: "down" }, { position: 8, name: "James R. Stokes", points: 3250, sales: 19, trend: "same" }, { position: 9, name: "David B. Rodriguez", points: 3250, sales: 17, trend: "down" }, ];
  const prizeDate = new Date("2025-09-25T00:00:00");
  const daysRemaining = Math.max(0, Math.ceil((prizeDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <motion.div className="flex min-h-screen text-gray-200 py-8 animated-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <div className="flex w-full max-w-[1200px] mx-auto flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-10 justify-between max-w-none w-full px-2">
          <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
              <div className="relative h-32 w-full overflow-hidden shimmer-effect">
                <div className="absolute inset-0 bg-gradient-to-r from-[#700089] to-[#d44e00]" />
                <div className="h-full w-full bg-black/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">FÉRIAS NO CARIBE</div>
              </div>
              <div className="flex flex-col p-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-100">Férias de luxo no Caribe</h3>
                  <span className="text-xs font-medium text-purple-400">Prêmio</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">Conquiste o primeiro lugar e ganhe uma viagem exclusiva.</p>
                <div className="flex-grow" />
                <div className="mt-2 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs text-gray-400">SET 25, 2025</span>
                </div>
                <div className="mt-3 w-full">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-700/50">
                    <motion.div className="h-2.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#f4a351]" initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.5, ease: "easeOut" }} />
                  </div>
                  <div className="mt-1 text-xs text-gray-400">⏳ Faltam {daysRemaining} dias</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
              <div className="flex items-center gap-2 p-4 border-b border-white/10">
                <div className="text-[#ff9d00]"><Star className="h-4 w-4" /></div>
                <h3 className="text-[#ff9d00] font-bold text-base [text-shadow:0_0_5px_#ff9d00]">PÓDIO DA TEMPORADA</h3>
              </div>
              <div className="flex flex-1 items-center justify-center py-6">
                <div className="flex w-full items-end justify-center gap-0">
                  <motion.div whileHover={{ scale: 1.04, y: -4 }} className="flex flex-[0.9] justify-center">
                    <PodiumCard position={2} name={topSellers[1].name} points={topSellers[1].points} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -6 }} animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="z-20 flex flex-[1.2] -translate-y-4 justify-center">
                    <PodiumCard position={1} name={topSellers[0].name} points={topSellers[0].points} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04, y: -4 }} className="flex flex-[0.9] justify-center">
                    <PodiumCard position={3} name={topSellers[2].name} points={topSellers[2].points} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(108,34,217,0.2)] bg-[#1F1F2B]">
              <div className="flex items-center gap-2 p-4 border-b border-white/10">
                <div className="text-[#ff9d00]"><MessageSquare className="h-4 w-4" /></div>
                <h3 className="text-[#ff9d00] font-bold text-base [text-shadow:0_0_5px_#ff9d00]">RANKING DE ENGAJAMENTO</h3>
              </div>
              <div className="flex flex-col p-3 flex-1">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/10">
                      <th className="text-left py-1 font-semibold">#</th>
                      <th className="text-left py-1 font-semibold">Vendedor</th>
                      <th className="text-right py-1 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engagementRanking.map((item) => {
                      const pct = (item.actions / maxEngagement) * 100;
                      return (
                        <tr key={item.rank} className="border-b border-white/10 last:border-none hover:bg-white/5 transition-colors">
                          <td className="py-3 text-gray-300 font-semibold w-8">{item.rank}</td>
                          <td className="py-3 text-gray-300">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800"><img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${item.name}`} alt={item.name} className="h-full w-full p-1" /></div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-200">{item.name}</div>
                                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                                  <motion.div style={{ width: `${pct}%` }} className="h-full bg-gradient-to-r from-[#a855f7] to-[#f4a351]" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-right font-bold text-[#ff9d00] [text-shadow:0_0_5px_#ff9d00]">
                            <AnimatedCounter to={item.actions} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-100">CLASSIFICAÇÃO GERAL</h3>
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(108,34,217,0.15)] bg-[#1F1F2B]">
            <div className="w-full">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="w-24 px-4 py-3 text-left text-white font-semibold rounded-tl-2xl">POSIÇÃO</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">VENDEDOR</th>
                    <th className="px-4 py-3 text-right text-white font-semibold">VENDAS</th>
                    <th className="px-4 py-3 text-right text-white font-semibold">PONTOS</th>
                    <th className="px-4 py-3 text-right text-white font-semibold rounded-tr-2xl">TENDÊNCIA</th>
                  </tr>
                </thead>
                <tbody>
                  {allSellers.map((seller, i) => (
                    <React.Fragment key={seller.position}>
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }} whileHover={{ y: -3, backgroundColor: "rgba(255, 255, 255, 0.1)" }} onClick={() => setExpanded(expanded === seller.position ? null : seller.position)} className={`cursor-pointer border-b border-white/10 transition-colors ${i % 2 === 0 ? "bg-[#1F1F2B]" : "bg-white/5"}`}>
                        <td className="px-4 py-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-700 text-sm font-semibold text-gray-200">{seller.position}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800"><img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seller.name}`} alt={seller.name} className="p-1" /></div>
                            <span className="text-sm font-semibold text-gray-200">{seller.name}</span>
                            {seller.position === 1 && <Medal className="h-4 w-4 text-yellow-400" />}
                            {seller.position === 2 && <Medal className="h-4 w-4 text-gray-400" />}
                            {seller.position === 3 && <Medal className="h-4 w-4 text-orange-400" />}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-gray-400">{seller.sales}</td>
                        <td className={`px-4 py-3 text-right font-bold ${seller.position === 1 ? "text-[#ff9d00]" : seller.position === 2 ? "text-[#c0c0c0]" : seller.position === 3 ? "text-[#cd7f32]" : "text-gray-200"}`}>
                          <AnimatedCounter to={seller.points} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          {seller.trend === "up" && <span className="inline-block font-bold text-green-400 [text-shadow:0_0_6px_#22c55e]">↑</span>}
                          {seller.trend === "down" && <span className="inline-block font-bold text-red-400 [text-shadow:0_0_6px_#ef4444]">↓</span>}
                          {seller.trend === "same" && <span className="inline-block text-gray-500">→</span>}
                        </td>
                      </motion.tr>

                      {expanded === seller.position && (
                        <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }} className="bg-black/20">
                          <td colSpan={5} className="p-2">
                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#1F1F2B] p-4">
                              <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-lg font-bold"><img src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seller.name}`} alt={seller.name} className="p-1" /></div>
                                <div>
                                  <div className="text-sm font-semibold">{seller.name}</div>
                                  <div className="text-xs text-gray-400">Posição {seller.position} • {seller.sales} vendas</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">Pontos</div>
                                  <div className="font-bold">{seller.points}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">Tendência</div>
                                  <div className="font-bold">{seller.trend === "up" ? "↑ Crescente" : seller.trend === "down" ? "↓ Em queda" : "→ Estável"}</div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
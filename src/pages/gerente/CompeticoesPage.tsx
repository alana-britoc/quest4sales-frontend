import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Play,
  Square,
  Loader2,
} from "lucide-react";
import { competitionService } from "@/services/competitionService";
import type { Competition, CreateCompetitionRequest, UpdateCompetitionRequest } from "@/dtos/CompetitionDTOs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "ATIVA":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "ENCERRADA":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    case "PLANEJADA":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "CANCELADA":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export default function CompeticoesPage() {
  const [loading, setLoading] = useState(true);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      setLoading(true);
      const data = await competitionService.getCompetitions();
      setCompetitions(data);
    } catch (error) {
      console.error("Erro ao carregar competições:", error);
      toast.error("Erro ao carregar competições");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompetition = async () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setIsSubmitting(true);
      const newCompetition: CreateCompetitionRequest = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      await competitionService.createCompetition(newCompetition);
      toast.success("Competição criada com sucesso!");
      setIsCreateDialogOpen(false);
      resetForm();
      loadCompetitions();
    } catch (error) {
      console.error("Erro ao criar competição:", error);
      toast.error("Erro ao criar competição");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCompetition = async () => {
    if (!selectedCompetition) return;
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setIsSubmitting(true);
      const updateData: UpdateCompetitionRequest = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      await competitionService.updateCompetition(selectedCompetition.id, updateData);
      toast.success("Competição atualizada com sucesso!");
      setIsEditDialogOpen(false);
      setSelectedCompetition(null);
      resetForm();
      loadCompetitions();
    } catch (error) {
      console.error("Erro ao atualizar competição:", error);
      toast.error("Erro ao atualizar competição");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCompetition = async () => {
    if (!selectedCompetition) return;

    try {
      setIsSubmitting(true);
      await competitionService.deleteCompetition(selectedCompetition.id);
      toast.success("Competição deletada com sucesso!");
      setIsDeleteDialogOpen(false);
      setSelectedCompetition(null);
      loadCompetitions();
    } catch (error) {
      console.error("Erro ao deletar competição:", error);
      toast.error("Erro ao deletar competição");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartCompetition = async (competition: Competition) => {
    try {
      await competitionService.startCompetition(competition.id);
      toast.success("Competição iniciada com sucesso!");
      loadCompetitions();
    } catch (error) {
      console.error("Erro ao iniciar competição:", error);
      toast.error("Erro ao iniciar competição");
    }
  };

  const handleFinishCompetition = async (competition: Competition) => {
    try {
      await competitionService.finishCompetition(competition.id);
      toast.success("Competição finalizada com sucesso!");
      loadCompetitions();
    } catch (error) {
      console.error("Erro ao finalizar competição:", error);
      toast.error("Erro ao finalizar competição");
    }
  };

  const openEditDialog = (competition: Competition) => {
    setSelectedCompetition(competition);
    setFormData({
      name: competition.name,
      description: competition.description || "",
      startDate: new Date(competition.startDate).toISOString().split('T')[0],
      endDate: new Date(competition.endDate).toISOString().split('T')[0],
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (competition: Competition) => {
    setSelectedCompetition(competition);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const activeCompetitions = competitions.filter((c) => c.status === "ATIVA");
  const plannedCompetitions = competitions.filter((c) => c.status === "PLANEJADA");
  const finishedCompetitions = competitions.filter((c) => c.status === "ENCERRADA");

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
      
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Competições</h1>
          <p className="text-gray-400">Gerencie competições e desafios</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Competição
        </Button>
      </motion.div>

      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ativas</p>
              <p className="text-3xl font-bold text-green-400">{activeCompetitions.length}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Planejadas</p>
              <p className="text-3xl font-bold text-blue-400">{plannedCompetitions.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Finalizadas</p>
              <p className="text-3xl font-bold text-gray-400">{finishedCompetitions.length}</p>
            </div>
            <div className="bg-gray-500 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </motion.div>

      
      <motion.div variants={itemVariants} className="space-y-4">
        {competitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitions.map((competition) => {
              const daysRemaining = Math.max(
                0,
                Math.ceil((new Date(competition.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              );

              return (
                <Card
                  key={competition.id}
                  className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{competition.name}</h3>
                        <Badge className={getStatusBadgeColor(competition.status)}>
                          {competition.status}
                        </Badge>
                      </div>
                      <div className="bg-violet-500 p-2 rounded-lg">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {competition.description && (
                      <p className="text-gray-400 text-sm">{competition.description}</p>
                    )}

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Início</span>
                        <span className="text-white">
                          {new Date(competition.startDate).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Término</span>
                        <span className="text-white">
                          {new Date(competition.endDate).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      {competition.status === "ATIVA" && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Dias restantes</span>
                          <span className="text-green-400 font-semibold">{daysRemaining}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-700 flex items-center justify-between gap-2">
                      {competition.status === "PLANEJADA" && (
                        <Button
                          size="sm"
                          onClick={() => handleStartCompetition(competition)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Iniciar
                        </Button>
                      )}
                      {competition.status === "ATIVA" && (
                        <Button
                          size="sm"
                          onClick={() => handleFinishCompetition(competition)}
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                        >
                          <Square className="w-4 h-4 mr-1" />
                          Finalizar
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(competition)}
                        className="flex-1 border-gray-700"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDeleteDialog(competition)}
                        className="border-gray-700 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-gray-800/50 border-gray-700 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Trophy className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhuma competição cadastrada</h3>
              <p className="text-gray-400 mb-4">Crie sua primeira competição para começar</p>
              <Button
                onClick={() => {
                  resetForm();
                  setIsCreateDialogOpen(true);
                }}
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Competição
              </Button>
            </div>
          </Card>
        )}
      </motion.div>

      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-violet-400" />
              Criar Nova Competição
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Preencha os dados da nova competição
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Competição</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-900 border-gray-700"
                placeholder="Ex: Batalha de Vendas Q1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-900 border-gray-700"
                placeholder="Descreva os objetivos da competição..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Término</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-gray-700"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateCompetition}
              className="bg-violet-600 hover:bg-violet-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Competição"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-400" />
              Editar Competição
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Atualize os dados da competição
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome da Competição</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-900 border-gray-700"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Data de Início</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endDate">Data de Término</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedCompetition(null);
              }}
              className="border-gray-700"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateCompetition}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Atualizando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <Trash2 className="w-5 h-5" />
              Deletar Competição
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Tem certeza que deseja deletar esta competição? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          {selectedCompetition && (
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-start gap-3">
                <div className="bg-violet-500 p-2 rounded-lg">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedCompetition.name}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(selectedCompetition.startDate).toLocaleDateString("pt-BR")} até{" "}
                    {new Date(selectedCompetition.endDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedCompetition(null);
              }}
              className="border-gray-700"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteCompetition}
              className="bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deletando...
                </>
              ) : (
                "Deletar Competição"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

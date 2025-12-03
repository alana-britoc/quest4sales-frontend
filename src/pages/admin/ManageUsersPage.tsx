import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  Mail,
  User as UserIcon,
  Loader2,
} from "lucide-react";
import { userService } from "@/services/userService";
import type { User, CreateUserRequest, UpdateUserRequest } from "@/dtos/UserDTOs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const AVAILABLE_ROLES = [
  { id: "1", name: "ADMIN", description: "Administrador do Sistema" },
  { id: "2", name: "MANAGER", description: "Gerente de Equipe" },
  { id: "3", name: "SELLER", description: "Vendedor" },
];

const getRoleBadgeColor = (roleName: string) => {
  switch (roleName) {
    case "ADMIN":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "MANAGER":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "SELLER":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export default function ManageUsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    roleId: "3",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers({ page: 0, size: 100 });
      setUsers(response.content);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!formData.username || !formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setIsSubmitting(true);
      const newUser: CreateUserRequest = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        roleId: formData.roleId,
      };

      await userService.createUser(newUser);
      toast.success("Usuário criado com sucesso!");
      setIsCreateDialogOpen(false);
      resetForm();
      loadUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast.error("Erro ao criar usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setIsSubmitting(true);
      const updateData: UpdateUserRequest = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await userService.updateUser(selectedUser.id, updateData);
      toast.success("Usuário atualizado com sucesso!");
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      resetForm();
      loadUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      setIsSubmitting(true);
      await userService.deleteUser(selectedUser.id);
      toast.success("Usuário deletado com sucesso!");
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      toast.error("Erro ao deletar usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      roleId: user.roles[0]?.id || "3",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      roleId: "3",
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciamento de Usuários</h1>
          <p className="text-gray-400">Gerencie usuários, roles e permissões</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </motion.div>

      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3 bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar usuário por nome, email ou username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-0 focus-visible:ring-0 text-white"
            />
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Usuários</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
            <div className="bg-violet-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </motion.div>

      
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800/50 border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-400">Usuário</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Role</TableHead>
                <TableHead className="text-gray-400">Criado em</TableHead>
                <TableHead className="text-gray-400 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {user.username.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.username}
                          </p>
                          <p className="text-xs text-gray-400">@{user.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.roles[0]?.name || "")}>
                        {user.roles[0]?.name || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditDialog(user)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDeleteDialog(user)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                    {searchTerm ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </motion.div>

      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-violet-400" />
              Criar Novo Usuário
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Preencha os dados do novo usuário
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Primeiro Nome</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-gray-900 border-gray-700 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-900 border-gray-700 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-gray-900 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 w-4 h-4 text-gray-400 z-10" />
                <Select
                  value={formData.roleId}
                  onValueChange={(value: string) => setFormData({ ...formData, roleId: value })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {AVAILABLE_ROLES.map((role) => (
                      <SelectItem key={role.id} value={role.id} className="text-white">
                        {role.name} - {role.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              onClick={handleCreateUser}
              className="bg-violet-600 hover:bg-violet-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar Usuário"
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
              Editar Usuário
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Atualize os dados do usuário
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">Primeiro Nome</Label>
                <Input
                  id="edit-firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Sobrenome</Label>
                <Input
                  id="edit-lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-username">Nome de Usuário</Label>
              <Input
                id="edit-username"
                value={formData.username}
                disabled
                className="bg-gray-900/50 border-gray-700 opacity-60"
              />
              <p className="text-xs text-gray-500">O username não pode ser alterado</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-900 border-gray-700 pl-10"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedUser(null);
              }}
              className="border-gray-700"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateUser}
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
              Deletar Usuário
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {selectedUser.username.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">
                    {selectedUser.firstName && selectedUser.lastName
                      ? `${selectedUser.firstName} ${selectedUser.lastName}`
                      : selectedUser.username}
                  </p>
                  <p className="text-sm text-gray-400">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedUser(null);
              }}
              className="border-gray-700"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deletando...
                </>
              ) : (
                "Deletar Usuário"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

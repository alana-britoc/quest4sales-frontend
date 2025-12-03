import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101015]">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-white">404</h1>
        <p className="text-2xl text-gray-400">Página não encontrada</p>
        <p className="text-gray-500">A página que você está procurando não existe.</p>
        <Button
          onClick={() => navigate("/")}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <Home className="w-4 h-4 mr-2" />
          Voltar para Início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

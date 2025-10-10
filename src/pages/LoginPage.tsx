import { useState } from 'react';
import { Eye, EyeOff, Trophy, BarChart3, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const infoPanelData = [
  {
    icon: Trophy,
    title: "Competições e Rankings",
    description: "Motive a sua equipe com rankings em tempo real e desafios estimulantes.",
    color: "text-orange-400"
  },
  {
    icon: BarChart3,
    title: "Dashboards Intuitivos",
    description: "Acompanhe a sua performance e evolução com gráficos claros e objetivos.",
    color: "text-fuchsia-400"
  },
  {
    icon: Target,
    title: "Metas e Recompensas",
    description: "Defina metas claras e celebre as conquistas com um sistema de recompensas.",
    color: "text-purple-400"
  }
];

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="absolute top-0 left-0 h-full w-1/2 flex items-center justify-center p-12 text-center backdrop-blur-lg bg-white/10 rounded-l-2xl">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-baseline">
            <span className="text-5xl font-light text-purple-400">Quest</span>
            <span className="text-5xl font-bold text-fuchsia-500">4</span>
            <span className="text-5xl font-light text-orange-500">sales</span>
          </div>
        </div>
        <h1 className="mb-6 text-3xl font-normal tracking-wider text-white">Fazer Login</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <a href="#" className="block text-right text-xs text-gray-300 hover:underline">
            Esqueci a minha senha
          </a>
          <button
            type="submit"
            className="
              w-full text-white font-semibold py-3 px-4 rounded-md
              border-2 border-orange-500
              bg-orange-500
              shadow-[0_0_15px_#ff7a00]
              hover:shadow-[0_0_25px_#ff7a00]
              hover:bg-orange-500/80
              transition-all duration-300
            "
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

const InfoPanel = () => {
  return (
    <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center p-12 text-center text-white backdrop-blur-lg bg-white/10 rounded-r-2xl">
      <h1 className="mb-8 text-3xl font-normal tracking-wider">Desbloqueie o seu Potencial</h1>
      <div className="space-y-6 text-left w-full">
        {infoPanelData.map((item) => (
          <div key={item.title} className="flex items-start space-x-4">
            <item.icon className={`h-8 w-8 ${item.color} mt-1 flex-shrink-0`} />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [isPanelActive, setIsPanelActive] = useState(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;900&display=swap');
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#3c0043] p-4 font-poppins">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[5%] h-[500px] w-[500px] rounded-full bg-purple-800/60 blur-3xl filter animate-blob"></div>
          <div className="absolute bottom-[20%] right-[5%] h-[350px] w-[350px] rounded-full bg-indigo-600/50 blur-3xl filter animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[5%] left-[20%] h-[300px] w-[300px] rounded-full bg-orange-500/40 blur-3xl filter animate-blob animation-delay-4000"></div>
          <div className="absolute top-[20%] right-[20%] h-[250px] w-[250px] rounded-full bg-fuchsia-600/50 blur-3xl filter animate-blob animation-delay-6000"></div>
          <div className="absolute top-[5%] right-[40%] h-[200px] w-[200px] rounded-full bg-cyan-600/30 blur-3xl filter animate-blob animation-delay-8000"></div>
          <div className="absolute bottom-[-15%] left-[-5%] h-[400px] w-[400px] rounded-full bg-purple-600/40 blur-3xl filter animate-blob animation-delay-10000"></div>
        </div>
        <div className="relative z-10 h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
          <SignInForm />
          <InfoPanel />
          <div
            className={`absolute top-4 z-20 h-[calc(100%-2rem)] w-[calc(50%-2rem)] rounded-3xl overflow-hidden shadow-lg transition-all duration-700 ease-in-out ${
              isPanelActive ? 'left-4' : 'left-[calc(50%+1rem)]'
            }`}
          >
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#3f035d] to-[#1a0e18] p-12 text-center text-white">
              {!isPanelActive && (
                <div className="transition-opacity duration-300 ease-in-out opacity-100 delay-200">
                  <h1 className="mb-4 text-3xl font-normal tracking-wider">Ainda não faz parte?</h1>
                  <p className="mb-6 text-gray-200">
                    Clique para saber mais sobre a plataforma que vai transformar a sua performance.
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2 rounded-md font-semibold text-white bg-transparent border-2 border-white hover:bg-white hover:text-purple-800 transition-all"
                    onClick={() => setIsPanelActive(true)}
                  >
                    Saber Mais
                  </button>
                </div>
              )}
              {isPanelActive && (
                <div className="transition-opacity duration-300 ease-in-out opacity-100 delay-200">
                  <h1 className="mb-4 text-3xl font-normal tracking-wider">Já tem uma conta?</h1>
                  <p className="mb-6 text-gray-200">
                    Faça o login para aceder ao seu dashboard e começar a competir.
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2 rounded-md font-semibold text-white bg-transparent border-2 border-white hover:bg-white hover:text-purple-800 transition-all"
                    onClick={() => setIsPanelActive(false)}
                  >
                    Fazer Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
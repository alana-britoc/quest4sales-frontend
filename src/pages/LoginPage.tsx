import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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
        <form className="w-full space-y-4">
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
              shadow-[0_0_15px_#ff7a00]
              hover:shadow-[0_0_25px_#ff7a00]
              hover:bg-orange-500/80
              bg-orange-500
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

type IconProps = {
  className?: string;
};

const TrophyIcon = ({ className }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);

const ChartIcon = ({ className }: IconProps) => (
   <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);

const TargetIcon = ({ className }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const InfoPanel = () => {
  return (
    <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center p-12 text-center text-white backdrop-blur-lg bg-white/10 rounded-r-2xl">
      <h1 className="mb-8 text-3xl font-normal tracking-wider">Desbloqueie o seu Potencial</h1>
      <div className="space-y-6 text-left w-full">
        <div className="flex items-start space-x-4">
          <TrophyIcon className="h-8 w-8 text-orange-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Competições e Rankings</h3>
            <p className="text-sm text-gray-300">Motive a sua equipe com rankings em tempo real e desafios estimulantes.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <ChartIcon className="h-8 w-8 text-fuchsia-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Dashboards Intuitivos</h3>
            <p className="text-sm text-gray-300">Acompanhe a sua performance e evolução com gráficos claros e objetivos.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <TargetIcon className="h-8 w-8 text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Metas e Recompensas</h3>
            <p className="text-sm text-gray-300">Defina metas claras e celebre as conquistas com um sistema de recompensas.</p>
          </div>
        </div>
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
          <div className="absolute top-[-10%] left-[10%] h-[500px] w-[400px] rounded-full bg-purple-800/80 blur-3xl filter"></div>
          <div className="absolute bottom-[20%] right-[5%] h-[350px] w-[350px] rounded-full bg-indigo-600/60 blur-3xl filter"></div>
          <div className="absolute bottom-[5%] left-[20%] h-[300px] w-[300px] rounded-full bg-indigo-600/60 blur-3xl filter"></div>
          <div className="absolute top-[20%] right-[20%] h-[250px] w-[250px] rounded-full bg-fuchsia-600/50 blur-3xl filter"></div>
        </div>
        <div className="relative z-10 h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
          <SignInForm />
          <InfoPanel />
          <div
            className={`absolute top-4 z-20 h-[calc(100%-2rem)] w-[calc(50%-2rem)] rounded-3xl overflow-hidden shadow-lg transition-all duration-700 ease-in-out ${
              isPanelActive ? 'left-4' : 'left-[calc(50%+1rem)]'
            }`}
          >
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#440041] to-[#6319b2] p-12 text-center text-white">
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


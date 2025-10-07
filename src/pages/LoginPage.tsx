import { LoginForm } from '../components/LoginForm';
import { LogoIcon } from '../components/LogoIcon';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-form-bg">
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 text-white 
                   bg-brand-gradient from-brand-purple-dark to-brand-purple-light 
                   rounded-r-3xl shadow-2xl">
        
        <div className="flex items-center mb-12">
          <LogoIcon className="h-12 w-12 text-brand-orange" />
          <div className="flex items-baseline ml-4">
            <span className="text-5xl font-bold text-white">Quest</span>
            <span className="text-5xl font-bold text-white">4</span>
            <span className="text-5xl font-bold text-brand-orange">sales</span>
          </div>
        </div>
        <h1 className="text-4xl text-center mb-6 max-w-md font-semibold">
          Plataforma de Gamificação para Equipes de Vendas
        </h1>
        <p className="text-center text-lg max-w-sm font-light text-white/80">
          Dominando os 4 trimestres. Venda o ano todo!
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-12">
        <LoginForm />
      </div>
    </div>
  );
}

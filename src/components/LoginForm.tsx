import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-brand-orange mb-8">
        Faça o seu login para começar
      </h2>
      
      <form className="space-y-6">
        <div>
          <Input
            type="email"
            placeholder="Enter email or user name"
            className="w-full px-4 py-3 bg-input-bg border-transparent rounded-lg text-brand-purple-dark placeholder:text-input-placeholder shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-purple-light"
          />
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-3 pr-12 bg-input-bg border-transparent rounded-lg text-brand-purple-dark placeholder:text-input-placeholder shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-purple-light"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-input-placeholder hover:text-brand-purple-light"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="text-right">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-800">
            Forgot password?
          </a>
        </div>

        <Button className="w-full bg-brand-orange hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-orange-400/50">
          Login
        </Button>
      </form>
    </div>
  );
}

import { Sidebar } from "./ui/sidebar";
import { Home, BarChart2, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex flex-col h-full bg-[#1F1F2B] text-white font-poppins">
        <div className="p-6 text-center border-b border-white/10">
          <div className="flex items-baseline justify-center">
            <span className="text-2xl font-light text-purple-400">Quest</span>
            <span className="text-2xl font-bold text-fuchsia-500">4</span>
            <span className="text-2xl font-light text-orange-500">sales</span>
        </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-purple-700 text-white"
                  : "hover:bg-white/10 text-gray-400"
              }`
            }
          >
            <Home size={20} />
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/perfil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-purple-700 text-white"
                  : "hover:bg-white/10 text-gray-400"
              }`
            }
          >
            <User size={20} />
            Meu Perfil
          </NavLink>
        </nav>
      </div>
    </Sidebar>
  );
}
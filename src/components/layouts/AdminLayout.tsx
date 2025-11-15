import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Users, Settings } from "lucide-react";

const navItems = [
  { name: "Usuários", href: "/admin/usuarios", icon: Users },
  { name: "Configurações", href: "/admin/config", icon: Settings },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();

  const baseLinkClass =
    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200";
  const inactiveLinkClass = "text-gray-400 hover:bg-gray-700 hover:text-white";
  const activeLinkClass = "bg-blue-600 text-white";

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-poppins">
      <aside className="w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <span className="text-2xl font-bold text-white">
              Q4S - ADMIN
            </span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `${baseLinkClass} ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700">
          <div className="text-sm">
            Logado como: <span className="font-bold">{user?.name}</span> (Admin)
          </div>
          <button
            onClick={logout}
            className="flex items-center p-2 text-sm font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </button>
        </header>
        <main className="flex-1 overflow-y-auto bg-[#101015] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
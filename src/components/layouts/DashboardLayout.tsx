import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { AppSidebar } from "../AppSidebar";
import { LogOut } from "lucide-react";

export default function DashboardLayout() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col md:ml-[calc(var(--sidebar-width)-100px)] group-data-[state=collapsed]:md:ml-[calc(var(--sidebar-width-icon)-40px)] transition-all duration-200">
          <header className="flex items-center justify-between h-16 px-6 bg-[#1F1F2B] border-b border-white/10 shadow-sm w-full flex-shrink-0">
            <h1 className="text-lg font-semibold text-gray-100 tracking-wide"></h1>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-4 focus:outline-none"
              >
                <span className="text-sm text-gray-400">
                  Olá, <strong className="text-white">Usuário</strong>
                </span>
                <img
                  src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=User"
                  alt="avatar"
                  className="h-9 w-9 rounded-full bg-gray-700 border-2 border-transparent group-hover:border-purple-500 transition-colors"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-[#2A2A4A] rounded-lg shadow-lg border border-white/10 z-50 animate-fade-in-down">
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-500/20 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          <SidebarInset className="flex-1 flex flex-col w-full transition-all duration-200">
            <main className="flex-1 p-8 overflow-y-auto w-full">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  Book, 
  Users, 
  BarChart2, 
  Settings, 
  User, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: ShoppingBag, label: "Pedidos", href: "/admin/pedidos" },
  { icon: Book, label: "Cardápio", href: "/admin/cardapio" },
  { icon: Users, label: "Clientes", href: "/admin/clientes" },
  { icon: BarChart2, label: "Relatórios", href: "/admin/relatorios" },
  { icon: Settings, label: "Configurações", href: "/admin/configuracoes" },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-30 w-64 bg-sidebar flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          <div className="logo-text">
            Webi<span>Delivery</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "sidebar-item",
                    location.pathname === item.href && "sidebar-active"
                  )}
                  onClick={closeSidebar}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-sidebar-accent/20 p-2 rounded-md">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground">João Silva</p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">joao@webidelivery.com</p>
                </div>
                <ChevronRight size={18} className="text-sidebar-foreground/60" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/admin/perfil" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 focus:text-red-500 flex items-center gap-2">
                <LogOut size={16} />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

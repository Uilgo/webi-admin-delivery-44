
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/pedidos": "Pedidos",
  "/admin/cardapio": "Cardápio",
  "/admin/clientes": "Clientes",
  "/admin/relatorios": "Relatórios",
  "/admin/configuracoes": "Configurações",
  "/admin/perfil": "Perfil",
};

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const pageTitle = PageTitles[location.pathname] || "WebiDelivery";
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <Header toggleSidebar={toggleSidebar} pageTitle={pageTitle} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

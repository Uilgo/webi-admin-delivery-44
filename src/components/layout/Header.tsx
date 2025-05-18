
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
}

const Header = ({ toggleSidebar, pageTitle }: HeaderProps) => {
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-2"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
        <h1 className="text-xl font-bold">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="hidden md:flex"
          asChild
        >
          <Link to="/cardapio" target="_blank">
            Ver Cardápio
          </Link>
        </Button>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-200"
          >
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                {notifications}
              </span>
            )}
          </Button>
        </div>
        
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;


import { Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
}

const Header = ({ toggleSidebar, pageTitle }: HeaderProps) => {
  const notifications = 3;

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{pageTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          className="hidden md:flex gap-2 h-9"
          asChild
        >
          <Link to="/cardapio" target="_blank">
            <ExternalLink className="h-4 w-4" />
            Ver Cardápio
          </Link>
        </Button>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold"
              >
                {notifications}
              </Badge>
            )}
          </Button>
        </div>
        
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuTabsProps {
  children: React.ReactNode;
}

export function MenuTabs({ children }: MenuTabsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Cardápio</h2>
      </div>
      
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid grid-cols-5 md:grid-cols-5 mb-4">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="adicionais">Adicionais</TabsTrigger>
          <TabsTrigger value="cupons">Cupons</TabsTrigger>
          <TabsTrigger value="promocoes">Promoções</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
        </TabsList>
        
        {children}
      </Tabs>
    </div>
  );
}

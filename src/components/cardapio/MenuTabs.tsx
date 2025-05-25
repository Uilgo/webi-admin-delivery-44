
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuTabsProps {
  children: React.ReactNode;
}

export function MenuTabs({ children }: MenuTabsProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Cardápio</h1>
          <p className="text-muted-foreground mt-1">Configure produtos, categorias, adicionais e promoções</p>
        </div>
      </div>
      
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid grid-cols-5 md:grid-cols-5 mb-6 h-12 p-1 bg-muted/50">
          <TabsTrigger value="menu" className="text-sm font-medium">Menu</TabsTrigger>
          <TabsTrigger value="adicionais" className="text-sm font-medium">Adicionais</TabsTrigger>
          <TabsTrigger value="cupons" className="text-sm font-medium">Cupons</TabsTrigger>
          <TabsTrigger value="promocoes" className="text-sm font-medium">Promoções</TabsTrigger>
          <TabsTrigger value="banners" className="text-sm font-medium">Banners</TabsTrigger>
        </TabsList>
        
        {children}
      </Tabs>
    </div>
  );
}

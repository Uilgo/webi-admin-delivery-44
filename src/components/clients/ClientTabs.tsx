
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClientTabsProps {
  children: React.ReactNode;
}

export function ClientTabs({ children }: ClientTabsProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="fidelizacao">Programa de Fidelização</TabsTrigger>
        </TabsList>
        
        {children}
      </Tabs>
    </div>
  );
}

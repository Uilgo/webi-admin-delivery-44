
import { ClientTabs } from "@/components/clients/ClientTabs";
import { ClientList } from "@/components/clients/ClientList";
import { LoyaltyProgram } from "@/components/clients/LoyaltyProgram";
import { TabsContent } from "@/components/ui/tabs";

const Clients = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Clientes</h1>
          <p className="text-muted-foreground mt-1">Visualize dados dos clientes e configure programas de fidelidade</p>
        </div>
      </div>
      
      <ClientTabs>
        <TabsContent value="lista" className="mt-6">
          <ClientList />
        </TabsContent>
        
        <TabsContent value="fidelizacao" className="mt-6">
          <LoyaltyProgram />
        </TabsContent>
      </ClientTabs>
    </div>
  );
};

export default Clients;

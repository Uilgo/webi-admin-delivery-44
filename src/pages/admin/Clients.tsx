
import { ClientTabs } from "@/components/clients/ClientTabs";
import { ClientList } from "@/components/clients/ClientList";
import { LoyaltyProgram } from "@/components/clients/LoyaltyProgram";
import { TabsContent } from "@/components/ui/tabs";

const Clients = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Clientes</h2>
      
      <ClientTabs>
        <TabsContent value="lista">
          <ClientList />
        </TabsContent>
        
        <TabsContent value="fidelizacao">
          <LoyaltyProgram />
        </TabsContent>
      </ClientTabs>
    </div>
  );
};

export default Clients;

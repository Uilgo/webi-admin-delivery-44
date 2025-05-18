
import { MenuTabs } from "@/components/cardapio/MenuTabs";
import { UnifiedMenuView } from "@/components/cardapio/UnifiedMenuView";
import { AdditionalsList } from "@/components/cardapio/AdditionalsList";
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Menu = () => {
  return (
    <MenuTabs>
      <TabsContent value="categorias" className="mt-4">
        <UnifiedMenuView />
      </TabsContent>
      
      <TabsContent value="produtos" className="mt-4">
        <Card className="p-6">
          <UnifiedMenuView />
        </Card>
      </TabsContent>
      
      <TabsContent value="adicionais" className="mt-4">
        <AdditionalsList />
      </TabsContent>
      
      <TabsContent value="cupons" className="mt-4">
        <Card className="p-6">
          <p className="text-lg font-medium">Gerenciar Cupons</p>
          <p className="text-muted-foreground">
            Crie e gerencie cupons de desconto para seus clientes.
          </p>
        </Card>
      </TabsContent>
      
      <TabsContent value="promocoes" className="mt-4">
        <Card className="p-6">
          <p className="text-lg font-medium">Gerenciar Promoções</p>
          <p className="text-muted-foreground">
            Configure promoções especiais para atrair mais clientes.
          </p>
        </Card>
      </TabsContent>
      
      <TabsContent value="banners" className="mt-4">
        <Card className="p-6">
          <p className="text-lg font-medium">Gerenciar Banners</p>
          <p className="text-muted-foreground">
            Configure os banners que serão exibidos no seu cardápio online.
          </p>
        </Card>
      </TabsContent>
    </MenuTabs>
  );
};

export default Menu;

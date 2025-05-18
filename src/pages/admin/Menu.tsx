
import { MenuTabs } from "@/components/cardapio/MenuTabs";
import { CategoryList } from "@/components/cardapio/CategoryList";
import { ProductList } from "@/components/cardapio/ProductList";
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Menu = () => {
  return (
    <MenuTabs>
      <TabsContent value="categorias">
        <CategoryList />
      </TabsContent>
      
      <TabsContent value="produtos">
        <ProductList />
      </TabsContent>
      
      <TabsContent value="adicionais">
        <Card className="p-6">
          <p className="text-lg font-medium">Gerenciar Adicionais</p>
          <p className="text-muted-foreground">
            Aqui você poderá criar grupos de adicionais e seus itens.
          </p>
        </Card>
      </TabsContent>
      
      <TabsContent value="cupons">
        <Card className="p-6">
          <p className="text-lg font-medium">Gerenciar Cupons</p>
          <p className="text-muted-foreground">
            Crie e gerencie cupons de desconto para seus clientes.
          </p>
        </Card>
      </TabsContent>
      
      <TabsContent value="promocoes">
        <Card className="p-6">
          <p className="text-lg font-medium">Gerenciar Promoções</p>
          <p className="text-muted-foreground">
            Configure promoções especiais para atrair mais clientes.
          </p>
        </Card>
      </TabsContent>
      
      <TabsContent value="banners">
        <Card className="p-6">
          <p className="text-lg font-medium">Gerenciar Banners</p>
          <p className="text-muted-foreground">
            Configure os banners que serão exibidos no seu cardápio online.
          </p>
        </Card>
      </TabsContent>
      
      <TabsContent value="fidelizacao">
        <Card className="p-6">
          <p className="text-lg font-medium">Programa de Fidelização</p>
          <p className="text-muted-foreground">
            Configure seu programa de fidelização para recompensar clientes frequentes.
          </p>
        </Card>
      </TabsContent>
    </MenuTabs>
  );
};

export default Menu;

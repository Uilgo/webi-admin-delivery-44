
import { MenuTabs } from "@/components/cardapio/MenuTabs";
import { UnifiedMenuView } from "@/components/cardapio/UnifiedMenuView";
import { AdditionalsList } from "@/components/cardapio/AdditionalsList";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Tag, Image, Sparkles } from "lucide-react";

const Menu = () => {
  return (
    <div className="animate-fade-in">
      <MenuTabs>
        <TabsContent value="menu" className="mt-6">
          <UnifiedMenuView />
        </TabsContent>
        
        <TabsContent value="adicionais" className="mt-6">
          <AdditionalsList />
        </TabsContent>
        
        <TabsContent value="cupons" className="mt-6">
          <Card className="border-dashed border-2 hover:border-primary/30 transition-colors">
            <CardHeader className="text-center py-8">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Tag className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Gerenciar Cupons</CardTitle>
              <CardDescription className="text-base max-w-md mx-auto">
                Crie e gerencie cupons de desconto para atrair mais clientes e aumentar suas vendas.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="text-sm text-muted-foreground mb-4">
                Em breve você poderá criar cupons personalizados para seus clientes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="promocoes" className="mt-6">
          <Card className="border-dashed border-2 hover:border-primary/30 transition-colors">
            <CardHeader className="text-center py-8">
              <div className="mx-auto mb-4 p-3 bg-orange-500/10 rounded-full w-fit">
                <Sparkles className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle className="text-2xl">Gerenciar Promoções</CardTitle>
              <CardDescription className="text-base max-w-md mx-auto">
                Configure promoções especiais e ofertas imperdíveis para seus clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="text-sm text-muted-foreground mb-4">
                Em breve você poderá criar promoções sazonais e ofertas especiais.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="banners" className="mt-6">
          <Card className="border-dashed border-2 hover:border-primary/30 transition-colors">
            <CardHeader className="text-center py-8">
              <div className="mx-auto mb-4 p-3 bg-blue-500/10 rounded-full w-fit">
                <Image className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">Gerenciar Banners</CardTitle>
              <CardDescription className="text-base max-w-md mx-auto">
                Configure os banners promocionais que serão exibidos no seu cardápio online.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="text-sm text-muted-foreground mb-4">
                Em breve você poderá criar e gerenciar banners promocionais.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </MenuTabs>
    </div>
  );
};

export default Menu;

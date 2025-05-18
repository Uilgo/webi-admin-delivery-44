
import { SalesReport } from "@/components/reports/SalesReport";
import { ClientsReport } from "@/components/reports/ClientsReport";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Relatórios</h2>
        <p className="text-muted-foreground">
          Analise os dados do seu negócio para tomar melhores decisões.
        </p>
      </div>
      
      <Tabs defaultValue="vendas">
        <TabsList>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="conversao">Conversão</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vendas" className="space-y-6 pt-6">
          <SalesReport />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pagamento</CardTitle>
                <CardDescription>
                  Distribuição de vendas por método de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de métodos de pagamento</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Horários de Pico</CardTitle>
                <CardDescription>
                  Distribuição de pedidos ao longo do dia
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de horários de pico</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status de Pedidos</CardTitle>
                <CardDescription>
                  Proporção de pedidos por status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de status de pedidos</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="clientes" className="space-y-6 pt-6">
          <ClientsReport />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequência de Compra</CardTitle>
                <CardDescription>
                  Análise de frequência de compra por tipo de cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de frequência de compra</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Valor Médio de Compra</CardTitle>
                <CardDescription>
                  Comparativo de ticket médio entre perfis de cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de valor médio</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="produtos" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
              <CardDescription>
                Ranking dos produtos com maior volume de vendas
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de produtos mais vendidos</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversao" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Progressive Profiling</CardTitle>
              <CardDescription>
                Efetividade das estratégias de coleta progressiva de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de conversão de cadastro</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;

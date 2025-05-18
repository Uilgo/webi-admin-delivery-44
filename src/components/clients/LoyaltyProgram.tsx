
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LoyaltyProgram() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Programa de Fidelização</CardTitle>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center relative">
              <Input 
                placeholder="Buscar cliente..." 
                className="pl-9 md:w-80"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="todos">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os clientes</SelectItem>
                  <SelectItem value="ativos">Clientes ativos</SelectItem>
                  <SelectItem value="inativos">Clientes inativos</SelectItem>
                  <SelectItem value="resgatados">Benefícios resgatados</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center p-4">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold">234</h3>
                  <p className="text-muted-foreground text-sm">Clientes no programa</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center p-4">
                  <Award className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold">57</h3>
                  <p className="text-muted-foreground text-sm">Benefícios resgatados</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center p-4">
                  <Award className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold">68%</h3>
                  <p className="text-muted-foreground text-sm">Taxa de conversão</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Regras de Fidelidade</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Regra
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">A cada 10 pedidos</h4>
                <p className="text-muted-foreground text-sm mb-4">O cliente ganha 1 item grátis à escolha.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
              
              <div className="bg-accent/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Acumulando R$500</h4>
                <p className="text-muted-foreground text-sm mb-4">O cliente ganha 15% de desconto no próximo pedido.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
              
              <div className="bg-accent/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Aniversário</h4>
                <p className="text-muted-foreground text-sm mb-4">O cliente ganha entrega gratuita no dia do aniversário.</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

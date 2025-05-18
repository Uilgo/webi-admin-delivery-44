
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ConfigForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações</h2>
        <p className="text-muted-foreground">
          Gerencie as configurações do seu delivery.
        </p>
      </div>
      
      <Tabs defaultValue="estabelecimento">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="estabelecimento">Estabelecimento</TabsTrigger>
          <TabsTrigger value="funcionamento">Funcionamento</TabsTrigger>
          <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
          <TabsTrigger value="entrega">Entrega</TabsTrigger>
          <TabsTrigger value="profiling">Cadastro Cliente</TabsTrigger>
        </TabsList>
        
        <TabsContent value="estabelecimento">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Estabelecimento</CardTitle>
              <CardDescription>
                Informações básicas sobre o seu delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Nome do Estabelecimento</Label>
                <Input id="business-name" defaultValue="Pizzaria Delícia" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 98765-4321" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" defaultValue="(11) 98765-4321" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" defaultValue="Rua das Pizzas, 123 - Bairro Italiano" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL do Cardápio</Label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-muted-foreground">
                    webidelivery.com/
                  </span>
                  <Input id="slug" defaultValue="pizzaria-delicia" className="rounded-l-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Estabelecimento</Label>
                <Select defaultValue="pizzaria">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pizzaria">Pizzaria</SelectItem>
                    <SelectItem value="hamburgueria">Hamburgueria</SelectItem>
                    <SelectItem value="acai">Açaiteria</SelectItem>
                    <SelectItem value="japonesa">Comida Japonesa</SelectItem>
                    <SelectItem value="marmita">Marmitaria</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo do Estabelecimento</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Alterar Logo
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="funcionamento">
          <Card>
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>
                Configure os dias e horários em que seu estabelecimento está aberto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"].map((day) => (
                  <div key={day} className="flex flex-wrap items-center gap-3">
                    <div className="min-w-[150px] flex items-center gap-2">
                      <Switch id={`day-${day}`} defaultChecked={day !== "Domingo"} />
                      <Label htmlFor={`day-${day}`}>{day}</Label>
                    </div>
                    
                    <div className="flex flex-1 flex-wrap gap-2">
                      <div className="space-y-1">
                        <Label htmlFor={`open-${day}`} className="text-xs">Abertura</Label>
                        <Input 
                          id={`open-${day}`} 
                          type="time" 
                          defaultValue="18:00"
                          className="w-28"
                          disabled={day === "Domingo"}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor={`close-${day}`} className="text-xs">Fechamento</Label>
                        <Input 
                          id={`close-${day}`} 
                          type="time" 
                          defaultValue="23:00"
                          className="w-28" 
                          disabled={day === "Domingo"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="pagamento">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>
                Configure os métodos de pagamento aceitos pelo seu estabelecimento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="payment-pix">Pix</Label>
                  </div>
                  <Switch id="payment-pix" defaultChecked />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="payment-credit">Cartão de Crédito</Label>
                  </div>
                  <Switch id="payment-credit" defaultChecked />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="payment-debit">Cartão de Débito</Label>
                  </div>
                  <Switch id="payment-debit" defaultChecked />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="payment-cash">Dinheiro</Label>
                  </div>
                  <Switch id="payment-cash" defaultChecked />
                </div>
                
                <div className="pl-6 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="payment-cash-change">Troco para quanto?</Label>
                    <Input id="payment-cash-change" placeholder="Deixe em branco para sem troco" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="entrega">
          <Card>
            <CardHeader>
              <CardTitle>Taxas de Entrega</CardTitle>
              <CardDescription>
                Configure as taxas de entrega por região.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="delivery-centro">Centro</Label>
                    <div className="text-xs text-muted-foreground">Até 3km</div>
                  </div>
                  <Input id="delivery-centro" defaultValue="5,00" className="w-24" />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="delivery-zona-norte">Zona Norte</Label>
                    <div className="text-xs text-muted-foreground">3-6km</div>
                  </div>
                  <Input id="delivery-zona-norte" defaultValue="8,00" className="w-24" />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="delivery-zona-sul">Zona Sul</Label>
                    <div className="text-xs text-muted-foreground">3-6km</div>
                  </div>
                  <Input id="delivery-zona-sul" defaultValue="8,00" className="w-24" />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="delivery-zona-leste">Zona Leste</Label>
                    <div className="text-xs text-muted-foreground">6-10km</div>
                  </div>
                  <Input id="delivery-zona-leste" defaultValue="12,00" className="w-24" />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="delivery-zona-oeste">Zona Oeste</Label>
                    <div className="text-xs text-muted-foreground">6-10km</div>
                  </div>
                  <Input id="delivery-zona-oeste" defaultValue="12,00" className="w-24" />
                </div>
                <Separator />
                
                <div>
                  <Button variant="outline" size="sm">
                    + Adicionar Região
                  </Button>
                </div>
                
                <div className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch id="free-delivery" />
                      <Label htmlFor="free-delivery">Ativar frete grátis acima de:</Label>
                    </div>
                    <Input defaultValue="100,00" className="max-w-[120px]" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="profiling">
          <Card>
            <CardHeader>
              <CardTitle>Progressive Profiling</CardTitle>
              <CardDescription>
                Configure como será coletado os dados dos clientes gradualmente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                <Textarea 
                  id="welcome-message" 
                  rows={3}
                  defaultValue="Cadastre-se para aproveitar descontos exclusivos e facilitar seus próximos pedidos!"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Benefícios para cadastro</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch id="benefit-discount" defaultChecked />
                    <Label htmlFor="benefit-discount">5% de desconto no próximo pedido</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="benefit-free-delivery" defaultChecked />
                    <Label htmlFor="benefit-free-delivery">Frete grátis no primeiro pedido após cadastro</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="benefit-points" defaultChecked />
                    <Label htmlFor="benefit-points">Programa de pontos</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Dados obrigatórios para progressão</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Switch id="field-name" defaultChecked disabled />
                    <Label htmlFor="field-name" className="text-muted-foreground">Nome (sempre obrigatório)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="field-phone" defaultChecked disabled />
                    <Label htmlFor="field-phone" className="text-muted-foreground">Telefone (sempre obrigatório)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="field-address" defaultChecked disabled />
                    <Label htmlFor="field-address" className="text-muted-foreground">Endereço (sempre obrigatório)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="field-email" defaultChecked />
                    <Label htmlFor="field-email">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="field-birthdate" />
                    <Label htmlFor="field-birthdate">Data de nascimento</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="field-cpf" />
                    <Label htmlFor="field-cpf">CPF</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Sequência de Progressive Profiling</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="profiling-steps" className="min-w-[200px]">Solicitação de cadastro</Label>
                    <Select defaultValue="after-order">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione quando solicitar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="after-order">Após concluir o pedido</SelectItem>
                        <SelectItem value="second-order">No segundo pedido</SelectItem>
                        <SelectItem value="checkout">Durante o checkout</SelectItem>
                        <SelectItem value="before-payment">Antes do pagamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="profiling-discount" className="min-w-[200px]">Valor do desconto no cadastro</Label>
                    <div className="flex items-center">
                      <Input id="profiling-discount" defaultValue="5" className="w-16" />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

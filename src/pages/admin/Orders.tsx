
import { useState } from "react";
import { OrderList } from "@/components/orders/OrderList";
import { OrderViewSelector } from "@/components/orders/OrderViewSelector";
import { OrderCard, OrderStatus } from "@/components/orders/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Lista de status para pedidos
const orderStatusList: OrderStatus[] = [
  { id: "pendente", label: "Pendente", color: "bg-gray-100 text-gray-800" },
  { id: "aceito", label: "Aceito", color: "bg-blue-100 text-blue-800" },
  { id: "em_preparo", label: "Em Preparo", color: "bg-yellow-100 text-yellow-800" },
  { id: "saiu_entrega", label: "Saiu para Entrega", color: "bg-purple-100 text-purple-800" },
  { id: "concluido", label: "Concluído", color: "bg-green-100 text-green-800" },
  { id: "cancelado", label: "Cancelado", color: "bg-red-100 text-red-800" },
];

// Dados simulados de pedidos
const mockOrders = [
  {
    id: "#42512",
    customer: "Ana Silva",
    status: "em_preparo",
    address: "Rua das Flores, 123 - Jardim Primavera",
    total: "R$ 57,90",
    date: "15/05/2025 19:45",
    payment: "Cartão de Crédito",
    isRegistered: true,
    items: [
      { name: "Pizza de Calabresa Grande", quantity: 1, price: "R$ 42,90" },
      { name: "Refrigerante 2L", quantity: 1, price: "R$ 12,00" },
      { name: "Borda Recheada", quantity: 1, price: "R$ 3,00" },
    ],
  },
  {
    id: "#42511",
    customer: "Carlos Ferreira",
    status: "pendente",
    address: "Av. Principal, 456 - Centro",
    total: "R$ 42,50",
    date: "15/05/2025 19:30",
    payment: "Pix",
    isRegistered: false,
    items: [
      { name: "Hambúrguer Artesanal", quantity: 1, price: "R$ 32,50" },
      { name: "Batata Frita", quantity: 1, price: "R$ 10,00" },
    ],
  },
  {
    id: "#42510",
    customer: "Juliana Mendes",
    status: "concluido",
    address: "Rua dos Pinheiros, 789 - Vila Verde",
    total: "R$ 86,00",
    date: "15/05/2025 19:15",
    payment: "Dinheiro",
    isRegistered: true,
    items: [
      { name: "Pizza de Frango c/ Catupiry", quantity: 1, price: "R$ 45,00" },
      { name: "Pizza de Chocolate", quantity: 1, price: "R$ 35,00" },
      { name: "Refrigerante 2L", quantity: 1, price: "R$ 12,00" },
    ],
  },
  {
    id: "#42509",
    customer: "Roberto Alves",
    status: "saiu_entrega",
    address: "Rua Secundária, 321 - Jardim Europa",
    total: "R$ 34,90",
    date: "15/05/2025 19:00",
    payment: "Cartão de Débito",
    isRegistered: false,
    items: [
      { name: "Açaí 500ml", quantity: 1, price: "R$ 25,90" },
      { name: "Complementos", quantity: 3, price: "R$ 9,00" },
    ],
  },
  {
    id: "#42508",
    customer: "Maria Oliveira",
    status: "cancelado",
    address: "Av. das Palmeiras, 654 - Centro",
    total: "R$ 65,80",
    date: "15/05/2025 18:45",
    payment: "Pix",
    isRegistered: true,
    items: [
      { name: "Pizza Quatro Queijos", quantity: 1, price: "R$ 45,80" },
      { name: "Refrigerante 2L", quantity: 1, price: "R$ 12,00" },
      { name: "Borda Recheada", quantity: 1, price: "R$ 8,00" },
    ],
  },
  {
    id: "#42507",
    customer: "Paulo Santos",
    status: "aceito",
    address: "Rua das Acácias, 987 - Jardim Floresta",
    total: "R$ 53,40",
    date: "15/05/2025 18:30",
    payment: "Cartão de Crédito",
    isRegistered: true,
    items: [
      { name: "Hambúrguer Duplo", quantity: 1, price: "R$ 38,90" },
      { name: "Refrigerante Lata", quantity: 1, price: "R$ 6,50" },
      { name: "Batata Frita P", quantity: 1, price: "R$ 8,00" },
    ],
  },
];

const Orders = () => {
  const [view, setView] = useState<"card" | "list">("card");
  
  const handleViewChange = (newView: "card" | "list") => {
    setView(newView);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <OrderViewSelector view={view} onViewChange={handleViewChange} />
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="grid grid-cols-7 mb-4">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendente">Pendente</TabsTrigger>
          <TabsTrigger value="aceito">Aceito</TabsTrigger>
          <TabsTrigger value="em_preparo">Em Preparo</TabsTrigger>
          <TabsTrigger value="saiu_entrega">Em Entrega</TabsTrigger>
          <TabsTrigger value="concluido">Concluído</TabsTrigger>
          <TabsTrigger value="cancelado">Cancelado</TabsTrigger>
        </TabsList>

        <TabsContent value="todos">
          {view === "list" ? (
            <OrderList />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  statusList={orderStatusList} 
                  onStatusChange={() => {}} 
                  onViewDetails={() => {}}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {orderStatusList.map((status) => (
          <TabsContent key={status.id} value={status.id}>
            {view === "list" ? (
              <OrderList statusFilter={status.id} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockOrders
                  .filter((order) => order.status === status.id)
                  .map((order) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      statusList={orderStatusList} 
                      onStatusChange={() => {}} 
                      onViewDetails={() => {}}
                    />
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Orders;

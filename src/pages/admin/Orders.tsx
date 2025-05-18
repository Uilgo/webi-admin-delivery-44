
import { useState, useMemo } from "react";
import { OrderList } from "@/components/orders/OrderList";
import { OrderViewSelector } from "@/components/orders/OrderViewSelector";
import { OrderCard, OrderStatus, Order } from "@/components/orders/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { StatusChangeConfirmation } from "@/components/orders/StatusChangeConfirmation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Lista de status para pedidos em ordem de progressão
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

// Função para determinar quais status podem ser selecionados a partir de um status atual
// Implementada para garantir que não permita retornar a um status anterior
const getAvailableStatuses = (currentStatus: string): OrderStatus[] => {
  // Lógica para definir a progressão de status permitida
  const statusIndex = orderStatusList.findIndex(s => s.id === currentStatus);
  
  if (currentStatus === "cancelado") {
    // Pedido cancelado não pode mudar para outros status
    return [orderStatusList.find(s => s.id === "cancelado")!];
  } 
  else if (currentStatus === "concluido") {
    // Pedido concluído só pode ser cancelado
    return [
      orderStatusList.find(s => s.id === "concluido")!,
      orderStatusList.find(s => s.id === "cancelado")!
    ];
  }
  
  // Retorna o status atual e todos os status posteriores (sem os anteriores)
  return orderStatusList.filter((_, index) => index >= statusIndex || index === orderStatusList.length - 1);
};

const Orders = () => {
  const [view, setView] = useState<"card" | "list">("card");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [statusChange, setStatusChange] = useState<{
    orderId: string;
    fromStatus: string;
    toStatus: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  
  // Filtrar pedidos com base no termo de busca e no status ativo
  const filteredOrders = useMemo(() => {
    let result = [...mockOrders];
    
    // Aplicar filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        order => order.id.toLowerCase().includes(term) || 
                order.customer.toLowerCase().includes(term) ||
                order.address.toLowerCase().includes(term)
      );
    }
    
    // Aplicar filtro de status (se não for "todos")
    if (activeTab !== "todos") {
      result = result.filter(order => order.status === activeTab);
    }
    
    return result;
  }, [searchTerm, activeTab]);

  const handleViewChange = (newView: "card" | "list") => {
    setView(newView);
  };

  const handleViewDetails = (orderId: string) => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsDetailsModalOpen(true);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      setStatusChange({
        orderId,
        fromStatus: order.status,
        toStatus: newStatus,
      });
      setSelectedOrder(order);
      setIsStatusChangeModalOpen(true);
    }
  };

  const confirmStatusChange = () => {
    if (statusChange) {
      // Na implementação real, aqui teria uma chamada API para atualizar o status
      const orderIndex = mockOrders.findIndex(o => o.id === statusChange.orderId);
      if (orderIndex >= 0) {
        mockOrders[orderIndex].status = statusChange.toStatus;
      }
    }
    setIsStatusChangeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar pedido, cliente ou endereço..." 
              className="pl-9 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <OrderViewSelector view={view} onViewChange={handleViewChange} />
        </div>
      </div>

      <Tabs 
        defaultValue="todos" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)} 
        className="w-full"
      >
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
            <OrderList 
              orders={filteredOrders} 
              onViewDetails={handleViewDetails}
              searchTerm={searchTerm}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    statusList={orderStatusList} 
                    onStatusChange={handleStatusChange} 
                    onViewDetails={() => handleViewDetails(order.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center p-6 text-muted-foreground">
                  Nenhum pedido encontrado
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {orderStatusList.map((status) => (
          <TabsContent key={status.id} value={status.id}>
            {view === "list" ? (
              <OrderList 
                orders={filteredOrders} 
                statusFilter={status.id} 
                onViewDetails={handleViewDetails}
                searchTerm={searchTerm}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders
                  .filter((order) => order.status === status.id)
                  .map((order) => (
                    <OrderCard 
                      key={order.id} 
                      order={order} 
                      statusList={orderStatusList} 
                      onStatusChange={handleStatusChange}
                      onViewDetails={() => handleViewDetails(order.id)}
                    />
                  ))}
                {filteredOrders.filter(order => order.status === status.id).length === 0 && (
                  <div className="col-span-full text-center p-6 text-muted-foreground">
                    Nenhum pedido com status {status.label}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrder}
        statusList={selectedOrder ? getAvailableStatuses(selectedOrder.status) : []}
        onStatusChange={handleStatusChange}
      />

      <StatusChangeConfirmation
        isOpen={isStatusChangeModalOpen}
        onClose={() => setIsStatusChangeModalOpen(false)}
        onConfirm={confirmStatusChange}
        orderId={statusChange?.orderId || ""}
        fromStatus={orderStatusList.find(s => statusChange?.fromStatus === s.id)}
        toStatus={orderStatusList.find(s => statusChange?.toStatus === s.id)}
      />
    </div>
  );
};

export default Orders;

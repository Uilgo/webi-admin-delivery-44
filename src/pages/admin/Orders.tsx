
import { useState, useMemo } from "react";
import { Order } from "@/components/orders/OrderCard";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrderStatusTabs } from "@/components/orders/OrderStatusTabs";
import { OrderContent } from "@/components/orders/OrderContent";
import { orderStatusList, mockOrders } from "@/components/orders/orderUtils";

const Orders = () => {
  const [view, setView] = useState<"card" | "list">("card");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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
    
    return result;
  }, [searchTerm]);

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
    // Na implementação real, aqui teria uma chamada API para atualizar o status
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex >= 0) {
      mockOrders[orderIndex].status = newStatus;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <OrderFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          view={view}
          onViewChange={handleViewChange}
        />
      </div>

      <OrderStatusTabs 
        orderStatusList={orderStatusList} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <OrderContent 
          view={view}
          filteredOrders={filteredOrders}
          orderStatusList={orderStatusList}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
          searchTerm={searchTerm}
          activeTab={activeTab}
        />
      </OrderStatusTabs>

      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrder}
        statusList={orderStatusList}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Orders;

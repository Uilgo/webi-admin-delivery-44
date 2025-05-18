
import { OrderList } from "@/components/orders/OrderList";
import { OrderCard, Order, OrderStatus } from "@/components/orders/OrderCard";
import { TabsContent } from "@/components/ui/tabs";

interface OrderContentProps {
  view: "card" | "list";
  filteredOrders: Order[];
  orderStatusList: OrderStatus[];
  onStatusChange: (orderId: string, newStatus: string) => void;
  onViewDetails: (orderId: string) => void;
  searchTerm: string;
  activeTab: string;
}

export function OrderContent({
  view,
  filteredOrders,
  orderStatusList,
  onStatusChange,
  onViewDetails,
  searchTerm,
  activeTab,
}: OrderContentProps) {
  const renderCardContent = (orders: Order[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard 
            key={order.id} 
            order={order} 
            statusList={orderStatusList} 
            onStatusChange={onStatusChange} 
            onViewDetails={() => onViewDetails(order.id)}
          />
        ))
      ) : (
        <div className="col-span-full text-center p-6 text-muted-foreground">
          Nenhum pedido encontrado
        </div>
      )}
    </div>
  );

  return (
    <>
      <TabsContent value="todos">
        {view === "list" ? (
          <OrderList 
            orders={filteredOrders} 
            onViewDetails={onViewDetails}
            searchTerm={searchTerm}
          />
        ) : (
          renderCardContent(filteredOrders)
        )}
      </TabsContent>

      {orderStatusList.map((status) => {
        const statusOrders = filteredOrders.filter((order) => order.status === status.id);
        return (
          <TabsContent key={status.id} value={status.id}>
            {view === "list" ? (
              <OrderList 
                orders={statusOrders} 
                statusFilter={status.id} 
                onViewDetails={onViewDetails}
                searchTerm={searchTerm}
              />
            ) : (
              renderCardContent(statusOrders)
            )}
          </TabsContent>
        );
      })}
    </>
  );
}

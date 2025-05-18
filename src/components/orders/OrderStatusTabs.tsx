
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "./OrderCard";

interface OrderStatusTabsProps {
  orderStatusList: OrderStatus[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  children: React.ReactNode;
}

export function OrderStatusTabs({
  orderStatusList,
  activeTab,
  setActiveTab,
  children,
}: OrderStatusTabsProps) {
  return (
    <Tabs 
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)} 
      className="w-full"
    >
      <TabsList className="grid grid-cols-7 mb-4">
        <TabsTrigger value="todos">Todos</TabsTrigger>
        {orderStatusList.map((status) => (
          <TabsTrigger key={status.id} value={status.id}>
            {status.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
}

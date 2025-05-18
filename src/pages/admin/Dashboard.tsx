
import { ShoppingBag, Users, TrendingUp, CreditCard } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { ConversionRate } from "@/components/dashboard/ConversionRate";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total de Pedidos" 
          value="325"
          icon={<ShoppingBag className="h-5 w-5" />}
          description="no mês atual"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Faturamento" 
          value="R$ 18.435,90"
          icon={<TrendingUp className="h-5 w-5" />}
          description="no mês atual"
          trend={{ value: 8.5, isPositive: true }}
        />
        <StatsCard 
          title="Clientes" 
          value="142"
          icon={<Users className="h-5 w-5" />}
          description="cadastrados"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard 
          title="Ticket Médio" 
          value="R$ 56,72"
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 2.3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />
        <ConversionRate />
      </div>

      <RecentOrders />
    </div>
  );
};

export default Dashboard;

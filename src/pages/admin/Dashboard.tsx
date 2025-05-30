
import { useState } from "react";
import { ShoppingBag, Users, TrendingUp, CreditCard } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { ConversionRate } from "@/components/dashboard/ConversionRate";
import { PeriodFilter } from "@/components/dashboard/PeriodFilter";

const Dashboard = () => {
  const [period, setPeriod] = useState("semanal");
  
  // Dados simulados para diferentes períodos
  const periodData = {
    semanal: {
      orders: "325",
      revenue: "R$ 18.435,90",
      clients: "142",
      averageTicket: "R$ 56,72",
      trends: {
        orders: 12,
        revenue: 8.5,
        clients: 5,
        averageTicket: -2.3
      }
    },
    mensal: {
      orders: "1.245",
      revenue: "R$ 72.890,50",
      clients: "345",
      averageTicket: "R$ 58,55",
      trends: {
        orders: 15,
        revenue: 12.3,
        clients: 8.7,
        averageTicket: 3.4
      }
    },
    anual: {
      orders: "14.760",
      revenue: "R$ 845.230,80",
      clients: "2.150",
      averageTicket: "R$ 57,25",
      trends: {
        orders: 32,
        revenue: 24.8,
        clients: 45,
        averageTicket: -1.2
      }
    }
  };
  
  const currentData = periodData[period as keyof typeof periodData];

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral do seu negócio</p>
        </div>
        <PeriodFilter onFilterChange={handlePeriodChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total de Pedidos" 
          value={currentData.orders}
          icon={<ShoppingBag className="h-5 w-5" />}
          description="no período atual"
          trend={{ value: currentData.trends.orders, isPositive: currentData.trends.orders > 0 }}
        />
        <StatsCard 
          title="Faturamento" 
          value={currentData.revenue}
          icon={<TrendingUp className="h-5 w-5" />}
          description="no período atual"
          trend={{ value: currentData.trends.revenue, isPositive: currentData.trends.revenue > 0 }}
        />
        <StatsCard 
          title="Clientes" 
          value={currentData.clients}
          icon={<Users className="h-5 w-5" />}
          description="cadastrados"
          trend={{ value: currentData.trends.clients, isPositive: currentData.trends.clients > 0 }}
        />
        <StatsCard 
          title="Ticket Médio" 
          value={currentData.averageTicket}
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: currentData.trends.averageTicket, isPositive: currentData.trends.averageTicket > 0 }}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <SalesChart period={period} />
        </div>
        <div className="xl:col-span-1">
          <ConversionRate period={period} />
        </div>
      </div>

      <RecentOrders />
    </div>
  );
};

export default Dashboard;

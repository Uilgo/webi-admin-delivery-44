
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface SalesChartProps {
  period: string;
  className?: string;
}

export function SalesChart({ period, className = "" }: SalesChartProps) {
  // Dados simulados para diferentes períodos
  const chartData = {
    semanal: [
      {
        name: 'Domingo',
        pedidos: 32,
        clientes: 18,
        cadastrados: 14,
      },
      {
        name: 'Segunda',
        pedidos: 24,
        clientes: 12,
        cadastrados: 10,
      },
      {
        name: 'Terça',
        pedidos: 38,
        clientes: 25,
        cadastrados: 12,
      },
      {
        name: 'Quarta',
        pedidos: 43,
        clientes: 30,
        cadastrados: 15,
      },
      {
        name: 'Quinta',
        pedidos: 50,
        clientes: 39,
        cadastrados: 22,
      },
      {
        name: 'Sexta',
        pedidos: 62,
        clientes: 45,
        cadastrados: 28,
      },
      {
        name: 'Sábado',
        pedidos: 75,
        clientes: 52,
        cadastrados: 30,
      },
    ],
    mensal: [
      { name: 'Semana 1', pedidos: 245, clientes: 180, cadastrados: 98 },
      { name: 'Semana 2', pedidos: 312, clientes: 210, cadastrados: 124 },
      { name: 'Semana 3', pedidos: 290, clientes: 185, cadastrados: 105 },
      { name: 'Semana 4', pedidos: 398, clientes: 240, cadastrados: 148 },
    ],
    anual: [
      { name: 'Jan', pedidos: 980, clientes: 620, cadastrados: 310 },
      { name: 'Fev', pedidos: 870, clientes: 540, cadastrados: 280 },
      { name: 'Mar', pedidos: 1100, clientes: 680, cadastrados: 350 },
      { name: 'Abr', pedidos: 1250, clientes: 720, cadastrados: 390 },
      { name: 'Mai', pedidos: 1380, clientes: 790, cadastrados: 420 },
      { name: 'Jun', pedidos: 1280, clientes: 710, cadastrados: 380 },
      { name: 'Jul', pedidos: 1490, clientes: 840, cadastrados: 450 },
      { name: 'Ago', pedidos: 1590, clientes: 920, cadastrados: 510 },
      { name: 'Set', pedidos: 1430, clientes: 830, cadastrados: 460 },
      { name: 'Out', pedidos: 1380, clientes: 790, cadastrados: 430 },
      { name: 'Nov', pedidos: 1510, clientes: 880, cadastrados: 490 },
      { name: 'Dez', pedidos: 1670, clientes: 950, cadastrados: 540 },
    ],
  };

  const data = chartData[period as keyof typeof chartData];
  const title = period === 'semanal' 
    ? 'Visão Semanal' 
    : period === 'mensal' 
      ? 'Visão Mensal' 
      : 'Visão Anual';

  const description = period === 'semanal'
    ? 'Análise de pedidos e clientes nos últimos 7 dias'
    : period === 'mensal'
      ? 'Análise de pedidos e clientes no último mês'
      : 'Análise de pedidos e clientes no último ano';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickMargin={10} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend />
              <Bar dataKey="pedidos" name="Pedidos" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="clientes" name="Clientes" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cadastrados" name="Cadastrados" fill="#4c1d95" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

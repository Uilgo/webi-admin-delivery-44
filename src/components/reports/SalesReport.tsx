
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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const data = [
  {
    name: 'Segunda',
    vendas: 1200,
    pedidos: 24,
  },
  {
    name: 'Terça',
    vendas: 1900,
    pedidos: 38,
  },
  {
    name: 'Quarta',
    vendas: 2150,
    pedidos: 43,
  },
  {
    name: 'Quinta',
    vendas: 2500,
    pedidos: 50,
  },
  {
    name: 'Sexta',
    vendas: 3100,
    pedidos: 62,
  },
  {
    name: 'Sábado',
    vendas: 3750,
    pedidos: 75,
  },
  {
    name: 'Domingo',
    vendas: 1600,
    pedidos: 32,
  },
];

export function SalesReport() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Relatório de Vendas</CardTitle>
          <CardDescription>Relatório semanal de vendas e pedidos</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="flex gap-1 items-center">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
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
              <YAxis yAxisId="left" orientation="left" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'vendas') return [`R$ ${value}`, 'Vendas'];
                  return [value, 'Pedidos'];
                }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="vendas" name="Vendas (R$)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="pedidos" name="Pedidos" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


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

const data = [
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
];

export function SalesChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Visão Semanal</CardTitle>
        <CardDescription>Análise de pedidos e clientes nos últimos 7 dias</CardDescription>
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


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ConversionRateProps {
  period?: string;
}

const periodData = {
  semanal: [
    { name: "Cadastrados", value: 65 },
    { name: "Não Cadastrados", value: 35 },
  ],
  mensal: [
    { name: "Cadastrados", value: 72 },
    { name: "Não Cadastrados", value: 28 },
  ],
  anual: [
    { name: "Cadastrados", value: 78 },
    { name: "Não Cadastrados", value: 22 },
  ]
};

const COLORS = ["#8b5cf6", "#e5e7eb"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ConversionRate({ period = "semanal" }: ConversionRateProps) {
  const data = periodData[period as keyof typeof periodData];
  
  // Calcular título baseado no período
  const periodTitle = period === 'semanal' 
    ? 'Semanal' 
    : period === 'mensal' 
      ? 'Mensal' 
      : 'Anual';
  
  // Calcular meta e conversão baseadas no período
  const targetText = period === 'semanal' 
    ? 'Meta: 70% de clientes cadastrados'
    : period === 'mensal'
      ? 'Meta: 75% de clientes cadastrados'
      : 'Meta: 80% de clientes cadastrados';
  
  const conversionText = period === 'semanal'
    ? 'Conversão na semana: +5%'
    : period === 'mensal'
      ? 'Conversão no mês: +7%'
      : 'Conversão no ano: +12%';
  
  const conversionColor = 'text-green-600';

  return (
    <Card className={cn("col-span-full lg:col-span-1")}>
      <CardHeader>
        <CardTitle className="text-base">Taxa de Conversão de Cadastro - {periodTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-muted-foreground text-center">
          <p>{targetText}</p>
          <p className={`${conversionColor} font-medium mt-1`}>{conversionText}</p>
        </div>
      </CardContent>
    </Card>
  );
}

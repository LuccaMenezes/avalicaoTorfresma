import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

// Definindo a interface para as props do componente
interface PieChartStatusProps {
  statusData: {
    status: string;
    count: number;
    percentage: string;
  }[];
}

export function PieChartStatus({ statusData }: PieChartStatusProps) {
  // Total de tarefas
  const totalTasks = React.useMemo(() => {
    return statusData.reduce((acc, curr) => acc + curr.count, 0);
  }, [statusData]);

  // Formatação dos dados para o gráfico
  const chartData = statusData.map(item => ({
    name: item.status || "Total",
    value: item.count,
    fill: item.status === "Pendentes" ? "hsl(var(--chart-2))" : 
          item.status === "Concluídas" ? "hsl(var(--chart-1))" : 
          item.status === "em Andamento" ? "hsl(var(--chart-4))" : 
          "#cccccc", // Cor padrão para status desconhecido
  }));

  // Configuração do gráfico (ajuste conforme necessário)
  const config: ChartConfig = {
    // Adicione as configurações necessárias aqui
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Overview - Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                const RADIAN = Math.PI / 180;
                const x = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
                const y = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
                    {value}
                  </text>
                );
              }}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tarefas Totais
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

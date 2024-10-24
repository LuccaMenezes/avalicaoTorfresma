import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { getToken } from "@/utils/authHelper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import api from "@/utils/api";

const chartConfig = {
  count: {
    label: "Tarefas",
  },
};

// Mapeamento de cores
const categoryColors: Record<string, string> = {
  "Faculdade": "hsl(var(--chart-1))", // Exemplo de cor
  "Pessoal": "hsl(var(--chart-2))",
  "Trabalho": "hsl(var(--chart-3))",
  "Pesquisa": "hsl(var(--chart-4))",
  "Desenvolvimento": "hsl(var(--chart-5))",
  "Lazer": "hsl(var(--chart-6))",
  "Saúde": "hsl(var(--chart-7))",
  "Outros": "hsl(var(--chart-8))",

  // Adicione mais categorias e cores conforme necessário
};

// Componente para a barra personalizada
const CustomBar = (props: any) => {
  const { fill, payload, ...rest } = props;
  const color = categoryColors[payload.category] || 'gray'; // Defina a cor com base na categoria

  return <rect {...rest} fill={color} />;
};

export function BarChartCategory() {
  const [chartData, setChartData] = useState<any[]>([]);
  const token = getToken(); // Obtém o token

  if (!token) {
    console.error("Token não encontrado!");
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/tasksByCategory", {
          headers: {
            Authorization: token,
          },
        });
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview - Categorias</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              strokeWidth={2}
              radius={8}
              shape={CustomBar} // Use o componente de barra personalizado
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

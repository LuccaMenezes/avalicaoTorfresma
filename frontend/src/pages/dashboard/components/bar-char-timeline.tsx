import { useEffect, useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { getToken } from "@/utils/authHelper";
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
import api from '@/utils/api';

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Tarefas",
  },
  desktop: {
    label: "Tarefas",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig;

export function BarChartTimeline() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("desktop");
  const [chartData, setChartData] = useState<{ date: string; count: number }[]>([]);

  const token = getToken();

  if (!token) {
    console.error("Token não encontrado!");
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/tasksByCreationDate', {
          headers: {
            Authorization: token,
          },
        });
        const formattedData = response.data.map(item => ({
          date: item.date,
          desktop: item.count,
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [token]);

  const total = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
    }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Tarefas criadas por data de criação.</CardTitle>
        </div>
        <div className="flex">
          {["desktop"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              // Removido o tickFormatter
              // tickFormatter={(value) => {
              //   const date = new Date(value);
              //   return date.toLocaleDateString("pt-br", {
              //     month: "short",
              //     day: "numeric",
              //   });
              // }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    // Removido o labelFormatter
                    // return new Date(value).toLocaleDateString("pt-br", {
                    //   month: "short",
                    //   day: "numeric",
                    //   year: "numeric",
                    // });
                    return value; // Retorna o valor diretamente
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type DashboardChartsProps = {
  data: {
    date: string;
    total: number;
    waiting: number;
  }[];
};

const chartConfig = {
  total: {
    label: "Total Visits",
    color: "hsl(var(--chart-1))",
  },
  waiting: {
    label: "Waiting List",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis />
          <Tooltip content={<ChartTooltipContent hideLabel />} />
          <Legend />
          <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          <Bar dataKey="waiting" fill="var(--color-waiting)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

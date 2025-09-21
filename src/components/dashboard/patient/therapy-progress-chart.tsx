
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { TherapyProgress } from "@/lib/types";
import { format } from 'date-fns';

type TherapyProgressChartProps = {
  data: TherapyProgress[];
};

const chartConfig = {
  painLevel: {
    label: "Pain Level",
    color: "hsl(var(--chart-2))",
  },
  mobilityScore: {
    label: "Mobility",
    color: "hsl(var(--chart-1))",
  },
  wellbeing: {
    label: "Well-being",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function TherapyProgressChart({ data }: TherapyProgressChartProps) {
    const formattedData = data.map(item => ({
        ...item,
        date: format(new Date(item.date), "MMM d"),
    }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
            accessibilityLayer
            data={formattedData}
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
            />
            <YAxis
                domain={[0, 10]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
            dataKey="mobilityScore"
            type="natural"
            fill="var(--color-mobilityScore)"
            fillOpacity={0.4}
            stroke="var(--color-mobilityScore)"
            />
            <Area
            dataKey="painLevel"
            type="natural"
            fill="var(--color-painLevel)"
            fillOpacity={0.4}
            stroke="var(--color-painLevel)"
            />
            <Area
            dataKey="wellbeing"
            type="natural"
            fill="var(--color-wellbeing)"
            fillOpacity={0.4}
            stroke="var(--color-wellbeing)"
            />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

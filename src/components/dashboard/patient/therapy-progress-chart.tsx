"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { TherapyProgress } from "@/lib/types";

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
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
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
    </ChartContainer>
  );
}

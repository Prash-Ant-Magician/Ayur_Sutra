
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import type { TherapyProgress } from "@/lib/types";
import { format } from "date-fns";

const chartConfig = {
  painLevel: { label: "Pain Level", color: "hsl(var(--chart-2))" },
  mobilityScore: { label: "Mobility", color: "hsl(var(--chart-1))" },
  wellbeing: { label: "Well-being", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export function PatientProgressChart({ data }: { data: TherapyProgress[] }) {
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), "MMM d"),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Progress Over Time</CardTitle>
        <CardDescription>Real-time tracking of key wellness metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        {formattedData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]}/>
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Area dataKey="painLevel" type="monotone" stroke="var(--color-painLevel)" fill="var(--color-painLevel)" fillOpacity={0.3} />
                <Area dataKey="mobilityScore" type="monotone" stroke="var(--color-mobilityScore)" fill="var(--color-mobilityScore)" fillOpacity={0.3} />
                <Area dataKey="wellbeing" type="monotone" stroke="var(--color-wellbeing)" fill="var(--color-wellbeing)" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <p>No progress has been logged for this patient yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

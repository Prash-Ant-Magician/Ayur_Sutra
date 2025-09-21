"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export function PatientProgressChart({ patient }: { patient: any }) {
  const data = [
    { month: "January", painLevel: 8 },
    { month: "February", painLevel: 7 },
    { month: "March", painLevel: 6 },
    { month: "April", painLevel: 5 },
    { month: "May", painLevel: 4 },
    { month: "June", painLevel: 3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pain Level Over Time</CardTitle>
        <CardDescription>Monthly progress of patient's pain level.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="painLevel" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
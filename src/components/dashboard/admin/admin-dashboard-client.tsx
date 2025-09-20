"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { User, Patient, Practitioner } from "@/lib/types";
import { DashboardCharts } from "./charts";
import { UserTable } from "./user-table";
import { visitorData } from "@/lib/data";
import { Activity, Users, DollarSign } from "lucide-react";

type AdminDashboardClientProps = {
  users: User[];
  visitorData: typeof import("@/lib/data").visitorData;
};

export function AdminDashboardClient({ users }: AdminDashboardClientProps) {
  const patients = users.filter((u) => u.role === 'patient') as Patient[];
  const practitioners = users.filter((u) => u.role === 'practitioner') as Practitioner[];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">
              +5 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Practitioners
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{practitioners.length}</div>
             <p className="text-xs text-muted-foreground">
              +1 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Visits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorData[visitorData.length-1].total}</div>
            <p className="text-xs text-muted-foreground">
              -12% since yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Visitor Analytics</CardTitle>
          <CardDescription>An overview of daily visits and waiting list counts for this week.</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardCharts data={visitorData} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">User Management</CardTitle>
          <CardDescription>View and manage all users on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patients">
            <TabsList>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="practitioners">Practitioners</TabsTrigger>
            </TabsList>
            <TabsContent value="patients">
              <UserTable users={patients} />
            </TabsContent>
            <TabsContent value="practitioners">
              <UserTable users={practitioners} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

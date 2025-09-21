"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import type { User, Patient, Practitioner, Appointment } from "@/lib/types";
import { Search, Bell } from "lucide-react";
import { format } from "date-fns";

type AdminDashboardClientProps = {
  stats: {
    totalPatients: number;
    totalTherapists: number;
    upcomingAppointments: number;
    newBookingsThisWeek: number;
  };
  upcomingAppointments: Appointment[];
  newRegistrations: Patient[];
  patients: Patient[];
  practitioners: Practitioner[];
};

const therapyTypeData = [
  { name: 'Abhyanga', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Shirodhara', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Others', value: 200, color: 'hsl(var(--chart-3))' },
];

export function AdminDashboardClient({ 
  stats, 
  upcomingAppointments,
  newRegistrations,
  patients,
  practitioners
}: AdminDashboardClientProps) {

  const getPatientName = (patientId: string) => patients.find(p => p.id === patientId)?.name || "Unknown";
  const getPractitionerName = (practitionerId: string) => practitioners.find(p => p.id === practitionerId)?.name || "Unknown";

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 bg-card" />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM dd, yyyy")}</span>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/avatar6/200/200" alt="Admin" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Quick Stats */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalPatients}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Therapists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalTherapists}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.upcomingAppointments}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">New Bookings This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.newBookingsThisWeek}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Upcoming Appointments */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Therapist</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map(apt => (
                        <TableRow key={apt.id}>
                          <TableCell>{getPatientName(apt.patientId)}</TableCell>
                          <TableCell>{getPractitionerName(apt.practitionerId)}</TableCell>
                          <TableCell>{format(new Date(apt.date), "MMM dd, hh:mm a")}</TableCell>
                          <TableCell>
                            <Button variant="link" className="text-primary p-0 h-auto">Reschedule</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
          </div>
          <div className="lg:col-span-1 space-y-8">
            {/* New Registrations */}
            <section>
              <h2 className="text-xl font-semibold mb-4">New Registrations</h2>
              <Card>
                <CardContent className="space-y-4">
                  {newRegistrations.map(patient => (
                     <div key={patient.id} className="flex items-center gap-3">
                       <Avatar className="h-10 w-10">
                         <AvatarImage src={patient.avatar} />
                         <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-medium">{patient.name}</p>
                         <p className="text-xs text-muted-foreground">Joined {format(new Date(patient.lastLogin), "MMM dd")}</p>
                       </div>
                     </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

         {/* Therapy Type Distribution */}
        <section>
            <h2 className="text-xl font-semibold mb-4">Therapy Type Distribution</h2>
            <Card>
                <CardContent className="flex items-center">
                    <div className="w-1/2 h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={therapyTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" labelLine={false}>
                                    {therapyTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 space-y-2">
                        {therapyTypeData.map(entry => (
                            <div key={entry.name} className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                                <span>{entry.name} ({(entry.value / therapyTypeData.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(0)}%)</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>

      </main>
    </div>
  );
}

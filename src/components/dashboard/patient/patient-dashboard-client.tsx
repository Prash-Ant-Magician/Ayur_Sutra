"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TherapyProgressChart } from "./therapy-progress-chart";
import { UpcomingAppointments } from "./upcoming-appointments";
import type { Appointment, TherapyProgress } from "@/lib/types";

type PatientDashboardClientProps = {
  therapyProgress: TherapyProgress[];
  appointments: Appointment[];
};

export function PatientDashboardClient({ therapyProgress, appointments }: PatientDashboardClientProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Therapy Progress</CardTitle>
            <CardDescription>Your recovery milestones over the past few months.</CardDescription>
          </CardHeader>
          <CardContent>
            <TherapyProgressChart data={therapyProgress} />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <UpcomingAppointments appointments={appointments} />
      </div>
    </div>
  );
}

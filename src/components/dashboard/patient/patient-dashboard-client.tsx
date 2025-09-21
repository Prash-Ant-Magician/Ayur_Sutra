"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TherapyProgressChart } from "./therapy-progress-chart";
import { UpcomingAppointments } from "./upcoming-appointments";
import type { Appointment, TherapyProgress, Practitioner } from "@/lib/types";
import { PastAppointments } from "./past-appointments";

type PatientDashboardClientProps = {
  therapyProgress: TherapyProgress[];
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  practitioners: Practitioner[];
};

export function PatientDashboardClient({ therapyProgress, upcomingAppointments, pastAppointments, practitioners }: PatientDashboardClientProps) {
  
  const getPractitionerName = (practitionerId: string) => {
    return practitioners.find(p => p.id === practitionerId)?.name || "N/A";
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <UpcomingAppointments appointments={upcomingAppointments} getPractitionerName={getPractitionerName} />
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
        <PastAppointments appointments={pastAppointments} getPractitionerName={getPractitionerName} />
      </div>
    </div>
  );
}

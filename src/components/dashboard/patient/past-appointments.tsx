"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Appointment } from "@/lib/types";
import { Calendar, CheckCircle } from "lucide-react";
import { format } from "date-fns";

type PastAppointmentsProps = {
  appointments: Appointment[];
  getPractitionerName: (id: string) => string;
};

export function PastAppointments({ appointments, getPractitionerName }: PastAppointmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Past Sessions</CardTitle>
        <CardDescription>A record of your completed therapies.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div key={apt.id} className="flex items-center gap-4 text-sm p-3 rounded-lg bg-muted/50">
              <CheckCircle className="w-5 h-5 text-primary"/>
              <div>
                <p className="font-semibold">{apt.therapyType}</p>
                <p className="text-muted-foreground">
                  {format(new Date(apt.date), "PPP")} with Dr. {getPractitionerName(apt.practitionerId)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm text-center py-4">No past appointments.</p>
        )}
      </CardContent>
    </Card>
  );
}

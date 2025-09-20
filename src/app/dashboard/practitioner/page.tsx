import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments, patients } from "@/lib/data";
import { Calendar, Clock, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { format } from 'date-fns';

export default function PractitionerPage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todaysAppointments = appointments.filter(a => a.date === today);

  const getPatientName = (patientId: string) => {
    return patients.find(p => p.id === patientId)?.name || "Unknown Patient";
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome, Dr. Reed!</h1>
          <p className="text-muted-foreground">Here is your schedule for today.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/practitioner/patients">
            <Users className="mr-2 h-4 w-4" /> View All Patients
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Today's Appointments</CardTitle>
          <CardDescription>{format(new Date(), 'EEEE, MMMM do, yyyy')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaysAppointments.length > 0 ? (
            todaysAppointments.map(apt => (
              <div key={apt.id} className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{getPatientName(apt.patientId)}</p>
                  <p className="text-muted-foreground">{apt.therapyType}</p>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{apt.time}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/practitioner/patients/${apt.patientId}`}>
                      View Profile <ArrowRight className="ml-2 w-4 h-4"/>
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">No appointments scheduled for today.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { AppointmentScheduler } from "@/components/dashboard/patient/appointment-scheduler";
import { appointments, practitioners } from "@/lib/data";

export default function SchedulePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Schedule a Session</h1>
      <p className="text-muted-foreground mb-8">
        Select a date and time that works for you.
      </p>
      <AppointmentScheduler appointments={appointments} practitioners={practitioners} />
    </div>
  );
}

import { AppointmentScheduler } from "@/components/dashboard/patient/appointment-scheduler";
import { appointments, practitioners } from "@/lib/data";

export default function SchedulePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Book Your Therapy Session</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Follow the steps below to schedule your appointment with one of our expert practitioners.
        </p>
      </div>
      <AppointmentScheduler appointments={appointments} practitioners={practitioners} />
    </div>
  );
}

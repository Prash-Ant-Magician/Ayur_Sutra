import { PatientDashboardClient } from "@/components/dashboard/patient/patient-dashboard-client";
import { appointments, therapyProgressData } from "@/lib/data";

export default function PatientPage() {
  const upcomingAppointments = appointments.filter(a => a.status === 'Scheduled' && new Date(a.date) >= new Date());

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Welcome back, Alice!</h1>
      <PatientDashboardClient 
        therapyProgress={therapyProgressData} 
        appointments={upcomingAppointments} 
      />
    </div>
  );
}

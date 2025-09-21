import { AdminDashboardClient } from "@/components/dashboard/admin/admin-dashboard-client";
import { patients, practitioners, appointments } from "@/lib/data";

export default function AdminPage() {
  const users = [...patients, ...practitioners];
  const upcomingAppointments = appointments.filter(a => new Date(a.date) >= new Date()).slice(0, 3);
  const newRegistrations = patients.slice(0, 2); // Example new registrations

  const stats = {
    totalPatients: patients.length,
    totalTherapists: practitioners.length,
    upcomingAppointments: upcomingAppointments.length,
    newBookingsThisWeek: 5, // Example static data
  };

  return (
    <AdminDashboardClient 
      stats={stats}
      upcomingAppointments={upcomingAppointments}
      newRegistrations={newRegistrations}
      patients={patients}
      practitioners={practitioners}
    />
  );
}

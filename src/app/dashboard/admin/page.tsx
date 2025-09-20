import { AdminDashboardClient } from "@/components/dashboard/admin/admin-dashboard-client";
import { patients, practitioners, visitorData } from "@/lib/data";

export default function AdminPage() {
  const users = [...patients, ...practitioners];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Admin Dashboard</h1>
      <AdminDashboardClient users={users} visitorData={visitorData} />
    </div>
  );
}


import { AdminDashboardClient } from "@/components/dashboard/admin/admin-dashboard-client";
import { db } from "@/lib/firebase";
import { Appointment, Patient, Practitioner } from "@/lib/types";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function AdminPage() {
  // Fetch practitioners
  const practitionersQuery = query(collection(db, "practitioners"));
  const practitionersSnapshot = await getDocs(practitionersQuery);
  const practitioners = practitionersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Practitioner));

  // Fetch patients
  const patientsQuery = query(collection(db, "users"), where("role", "==", "patient"));
  const patientsSnapshot = await getDocs(patientsQuery);
  const patients = patientsSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      role: 'patient',
      avatar: `https://picsum.photos/seed/${doc.id}/200/200`,
      lastLogin: new Date().toISOString(), // This should be updated on actual login
      medicalHistory: '', // These fields are not in the 'users' collection
      symptoms: '',
      currentTherapies: '',
      dob: '',
      gender: 'Other'
  } as Patient));
  
  // Fetch appointments
  const now = new Date();
  const appointmentsQuery = query(
    collection(db, "appointments"),
    where("date", ">=", format(now, "yyyy-MM-dd")),
    orderBy("date"),
    limit(3)
  );
  const appointmentsSnapshot = await getDocs(appointmentsQuery);
  const upcomingAppointments = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));

  // Fetch new registrations (recently created patients) - Approximating with a simple query
  const newRegistrationsQuery = query(collection(db, "users"), where("role", "==", "patient"), orderBy("name"), limit(2)); // Firestore doesn't have a reliable "createdAt" without setting it
  const newRegistrationsSnapshot = await getDocs(newRegistrationsQuery);
  const newRegistrations = newRegistrationsSnapshot.docs.map(doc => ({
       id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      role: 'patient',
      avatar: `https://picsum.photos/seed/${doc.id}/200/200`,
      lastLogin: new Date().toISOString(),
      medicalHistory: '',
      symptoms: '',
      currentTherapies: '',
      dob: '',
      gender: 'Other'
  } as Patient));

  const stats = {
    totalPatients: patients.length,
    totalTherapists: practitioners.length,
    upcomingAppointments: upcomingAppointments.length,
    newBookingsThisWeek: 5, // This would require a more complex query to calculate
  };

  return (
    <>
      <div className="absolute top-6 right-8">
        <Button asChild>
          <Link href="/dashboard/admin/book-appointment">
            <PlusCircle className="mr-2 h-4 w-4" /> Book Appointment
          </Link>
        </Button>
      </div>
      <AdminDashboardClient 
        stats={stats}
        upcomingAppointments={upcomingAppointments}
        newRegistrations={newRegistrations}
        patients={patients}
        practitioners={practitioners}
      />
    </>
  );
}

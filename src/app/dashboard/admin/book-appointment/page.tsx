
import { AdminAppointmentForm } from "@/components/dashboard/admin/admin-appointment-form";
import { db } from "@/lib/firebase";
import { Patient, Practitioner } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function AdminBookAppointmentPage() {
    const patientsQuery = query(collection(db, "users"), where("role", "==", "patient"));
    const patientsSnapshot = await getDocs(patientsQuery);
    const patients = patientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Patient));

    const practitionersQuery = query(collection(db, "practitioners"));
    const practitionersSnapshot = await getDocs(practitionersQuery);
    const practitioners = practitionersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Practitioner));

    return (
        <div className="container mx-auto py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline text-primary">Book an Appointment for a Patient</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Select a patient, practitioner, and therapy to schedule a new session.
                </p>
            </div>
            <AdminAppointmentForm patients={patients} practitioners={practitioners} />
        </div>
    );
}

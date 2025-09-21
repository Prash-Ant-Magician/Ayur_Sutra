"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AppointmentScheduler } from "@/components/dashboard/patient/appointment-scheduler";
import { Appointment, Practitioner } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function SchedulePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch appointments
      const appointmentsQuery = query(collection(db, "appointments"));
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const allAppointments = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(allAppointments);
      
      // Fetch practitioners
      const practitionersQuery = query(collection(db, "practitioners"));
      const practitionersSnapshot = await getDocs(practitionersQuery);
      const allPractitioners = practitionersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Practitioner));
      setPractitioners(allPractitioners);

      setLoading(false);
    }
    fetchData();
  }, []);


  if (loading) {
      return (
          <div className="container mx-auto py-8">
               <div className="text-center mb-12">
                <Skeleton className="h-10 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </div>
            <Skeleton className="h-[500px] w-full max-w-4xl mx-auto" />
          </div>
      )
  }

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

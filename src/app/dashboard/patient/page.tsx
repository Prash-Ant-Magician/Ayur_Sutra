
"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { PatientDashboardClient } from "@/components/dashboard/patient/patient-dashboard-client";
import { Appointment, Practitioner, TherapyProgress } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";

export default function PatientPage() {
  const { user } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [therapyProgress, setTherapyProgress] = useState<TherapyProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const now = new Date();

        // Fetch appointments
        const appointmentsQuery = query(collection(db, "appointments"), where("patientUid", "==", user.uid));
        const appointmentsSnapshot = await getDocs(appointmentsQuery);
        const allAppointments = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
        
        const upcoming = allAppointments.filter(a => new Date(a.date) >= now);
        const past = allAppointments.filter(a => new Date(a.date) < now);

        setUpcomingAppointments(upcoming);
        setPastAppointments(past);
        
        // Fetch practitioners
        const practitionersQuery = query(collection(db, "practitioners"));
        const practitionersSnapshot = await getDocs(practitionersQuery);
        const allPractitioners = practitionersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Practitioner));
        setPractitioners(allPractitioners);

        // Fetch progress data
        const progressQuery = query(collection(db, `users/${user.uid}/progress_notes`), orderBy("date", "asc"));
        const progressSnapshot = await getDocs(progressQuery);
        const progressData = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TherapyProgress));
        setTherapyProgress(progressData);

        setLoading(false);
      }
      fetchData();
    } else {
        setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
        <div className="container mx-auto py-8">
            <Skeleton className="h-8 w-1/2 mb-8" />
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/4" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-64 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/3" />
                             <Skeleton className="h-4 w-2/3" />
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <Skeleton className="h-16 w-full" />
                             <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
  }

  if (!user) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Please log in to see your dashboard.</h1>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Welcome back, {user.displayName || 'Patient'}!</h1>
      <PatientDashboardClient 
        therapyProgress={therapyProgress} 
        upcomingAppointments={upcomingAppointments} 
        pastAppointments={pastAppointments}
        practitioners={practitioners}
      />
    </div>
  );
}

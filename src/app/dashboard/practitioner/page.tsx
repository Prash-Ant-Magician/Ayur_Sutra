"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { format } from 'date-fns';
import { useAuth } from "@/context/auth-context";
import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Appointment, Patient } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function PractitionerPage() {
  const { user } = useAuth();
  const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const today = format(new Date(), 'yyyy-MM-dd');

        // Fetch appointments for today for the logged-in practitioner
        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("practitionerId", "==", user.uid),
          where("date", "==", today)
        );
        const appointmentsSnapshot = await getDocs(appointmentsQuery);
        const appointments = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
        setTodaysAppointments(appointments);

        // Fetch all patients to get their names
        if (appointments.length > 0) {
            const patientIds = [...new Set(appointments.map(a => a.patientUid))];
            if (patientIds.length > 0) {
                 const patientsQuery = query(collection(db, "users"), where(documentId(), "in", patientIds));
                 const patientsSnapshot = await getDocs(patientsQuery);
                 const patientData = patientsSnapshot.docs.map(doc => ({
                     id: doc.id,
                     ...doc.data()
                 } as Patient));
                 setPatients(patientData);
            }
        }
        setLoading(false);
      };
      fetchData();
    } else {
        setLoading(false);
    }
  }, [user]);

  const getPatientName = (patientId: string) => {
    return patients.find(p => p.id === patientId)?.name || "Unknown Patient";
  };
  
   if (loading) {
    return (
        <div className="container mx-auto py-8">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-8" />
             <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-1/4" />
                   <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
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
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome, {user.displayName || 'Dr. Practitioner'}!</h1>
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
                  <p className="font-semibold text-lg">{getPatientName(apt.patientUid)}</p>
                  <p className="text-muted-foreground">{apt.therapyType}</p>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{apt.time}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/practitioner/patients/${apt.patientUid}`}>
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

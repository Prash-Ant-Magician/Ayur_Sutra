
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PrecautionGenerator } from "@/components/dashboard/practitioner/precaution-generator";
import { TherapySuggester } from "@/components/dashboard/practitioner/therapy-suggester";
import { Cake, HeartPulse, Stethoscope, User, BookHeart } from "lucide-react";
import { PatientProgressChart } from "@/components/dashboard/practitioner/patient-progress-chart";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Patient, TherapyProgress } from "@/lib/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LogProgressForm } from "@/components/dashboard/practitioner/log-progress-form";


export default function PatientDetailPage({ params }: { params: { id: string } }) {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [progressData, setProgressData] = useState<TherapyProgress[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchPatientData = async () => {
        const patientDocRef = doc(db, "users", params.id);
        const patientDoc = await getDoc(patientDocRef);

        if (patientDoc.exists() && patientDoc.data().role === 'patient') {
            const patientData = patientDoc.data();
            setPatient({
                id: patientDoc.id,
                name: patientData.name,
                email: patientData.email,
                role: 'patient',
                avatar: `https://picsum.photos/seed/${patientDoc.id}/200/200`,
                lastLogin: new Date().toISOString(), // Not available in 'users' doc
                medicalHistory: patientData.medicalHistory || 'No history provided.',
                symptoms: patientData.symptoms || 'No symptoms provided.',
                currentTherapies: patientData.currentTherapies || 'No therapies listed.',
                dob: patientData.dob ? format(patientData.dob.toDate(), "PPP") : 'Not provided',
                gender: patientData.gender || 'Not specified'
            });
        }
    };

    const fetchProgressData = async () => {
        const progressQuery = query(collection(db, `users/${params.id}/progress_notes`), orderBy("date", "asc"));
        const progressSnapshot = await getDocs(progressQuery);
        const data = progressSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as TherapyProgress));
        setProgressData(data);
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchPatientData(), fetchProgressData()]);
            setLoading(false);
        }
        loadData();
    }, [params.id]);
    
    const handleProgressLogged = () => {
        fetchProgressData(); // Refetch progress data when a new log is submitted
    };

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex items-center gap-6 mb-8">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <div className="grid gap-8">
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        );
    }
  
    if (!patient) {
      return (
         <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Patient not found.</h1>
        </div>
      );
    }

  const patientProfile = `Medical History: ${patient.medicalHistory}. Symptoms: ${patient.symptoms}. Current Therapies: ${patient.currentTherapies}.`;

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <Avatar className="w-24 h-24 border-4 border-card">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback className="text-3xl">{patient.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">{patient.name}</h1>
          <p className="text-muted-foreground">{patient.email}</p>
           <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{patient.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Cake className="h-4 w-4" />
                    <span>Born {patient.dob}</span>
                </div>
            </div>
        </div>
      </div>
      
      <div className="grid gap-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-4">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                       <div>
                          <h4 className="font-semibold flex items-center gap-2"><HeartPulse className="h-4 w-4 text-primary"/>Medical History</h4>
                          <p className="text-muted-foreground ml-6">{patient.medicalHistory}</p>
                      </div>
                       <div>
                          <h4 className="font-semibold flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary"/>Current Symptoms</h4>
                          <p className="text-muted-foreground ml-6">{patient.symptoms}</p>
                      </div>
                       <div>
                          <h4 className="font-semibold flex items-center gap-2"><User className="h-4 w-4 text-primary"/>Current Therapies</h4>
                          <p className="text-muted-foreground ml-6">{patient.currentTherapies}</p>
                      </div>
                  </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><BookHeart className="h-5 w-5 text-primary"/>Log Session Progress</CardTitle>
                    <CardDescription>Record notes and metrics from the latest session.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LogProgressForm patientId={patient.id} onProgressLogged={handleProgressLogged}/>
                </CardContent>
              </Card>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 gap-8 content-start">
            <PatientProgressChart data={progressData} />
            <TherapySuggester profile={patientProfile} />
            <PrecautionGenerator patient={patient} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { patients } from "@/lib/data";
import { notFound } from "next/navigation";
import { PrecautionGenerator } from "@/components/dashboard/practitioner/precaution-generator";
import { TherapySuggester } from "@/components/dashboard/practitioner/therapy-suggester";
import { Cake, HeartPulse, Stethoscope, User } from "lucide-react";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = patients.find(p => p.id === params.id);

  if (!patient) {
    notFound();
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
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
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
        </div>
        <div className="space-y-8">
          <TherapySuggester profile={patientProfile} />
          <PrecautionGenerator patient={patient} />
        </div>
      </div>
    </div>
  );
}

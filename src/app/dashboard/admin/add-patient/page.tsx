
import { AddPatientForm } from "@/components/dashboard/admin/add-patient-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddPatientPage() {
    return (
        <div className="container mx-auto py-8">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline text-primary">Add a New Patient</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Enter the patient's details below to create a new account.
                </p>
            </div>
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>A temporary password will be generated for the patient.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddPatientForm />
                </CardContent>
            </Card>
        </div>
    )
}

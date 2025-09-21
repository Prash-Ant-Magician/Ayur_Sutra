
import { AddPractitionerForm } from "@/components/dashboard/admin/add-practitioner-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddPractitionerPage() {
    return (
        <div className="container mx-auto py-8">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline text-primary">Add a New Practitioner</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Enter the practitioner's details below to create a new account.
                </p>
            </div>
            <Card className="max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Practitioner Information</CardTitle>
                    <CardDescription>A temporary password will be generated and displayed upon creation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddPractitionerForm />
                </CardContent>
            </Card>
        </div>
    )
}

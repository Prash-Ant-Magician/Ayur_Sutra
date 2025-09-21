
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceForm } from "@/components/dashboard/admin/resources/resource-form";

export default function AddResourcePage() {
    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Create a New Article</CardTitle>
                    <CardDescription>Fill out the form below to publish a new resource for patients.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResourceForm />
                </CardContent>
            </Card>
        </div>
    );
}

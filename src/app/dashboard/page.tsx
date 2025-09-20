import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/layout/logo";

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-full p-4 sm:p-6">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit">
                        <Logo className="h-12 w-12 text-primary"/>
                    </div>
                    <CardTitle className="mt-4 text-3xl font-headline">Welcome to AyurSutra</CardTitle>
                    <CardDescription>Your central hub for holistic wellness.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Please select an option from the sidebar to begin managing your therapy sessions, patient data, or system settings.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

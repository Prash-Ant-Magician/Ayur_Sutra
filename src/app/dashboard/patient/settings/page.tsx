import { ChangePasswordForm } from "@/components/dashboard/patient/change-password-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="container mx-auto py-8">
             <h1 className="text-3xl font-bold font-headline mb-8">Settings</h1>
             <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Change Password</CardTitle>
                        <CardDescription>Update your password here. It's recommended to use a strong, unique password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChangePasswordForm />
                    </CardContent>
                </Card>
             </div>
        </div>
    );
}

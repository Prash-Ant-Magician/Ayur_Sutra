import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
    return (
        <div className="container mx-auto py-8">
             <h1 className="text-3xl font-bold font-headline mb-8">Admin Settings</h1>
             <div className="max-w-2xl mx-auto grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">System Configuration</CardTitle>
                        <CardDescription>Manage general settings for the application.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="clinicName">Clinic Name</Label>
                            <Input id="clinicName" defaultValue="Ayur Sutra" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="supportEmail">Support Email</Label>
                            <Input id="supportEmail" type="email" defaultValue="contact@ayursutra.com" />
                        </div>
                         <Button>Save Settings</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Notification Settings</CardTitle>
                        <CardDescription>Configure when and how notifications are sent.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">This section is under construction.</p>
                         <Button disabled>Save Notification Settings</Button>
                    </CardContent>
                </Card>
             </div>
        </div>
    );
}

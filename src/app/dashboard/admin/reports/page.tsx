import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, Activity } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Reports & Analytics</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-primary" /> Reports Dashboard</CardTitle>
            <CardDescription>
              This section is under construction. Future reports will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-2">
                    <Users className="h-10 w-10"/>
                    <p>Patient Demographics</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Activity className="h-10 w-10"/>
                    <p>Appointment Trends</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <BarChart className="h-10 w-10"/>
                    <p>Revenue Reports</p>
                </div>
            </div>
            <p className="mt-8 font-semibold">Coming Soon!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

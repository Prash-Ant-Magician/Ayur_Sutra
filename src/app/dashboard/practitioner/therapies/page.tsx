import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplet, Sun } from "lucide-react";

const therapies = [
  {
    name: "Panchakarma",
    description: "A complete detoxification process to cleanse the body and mind.",
    icon: <Leaf className="h-6 w-6 text-primary" />,
  },
  {
    name: "Abhyanga",
    description: "A full-body massage with warm, herb-infused oils to improve circulation.",
    icon: <Droplet className="h-6 w-6 text-primary" />,
  },
  {
    name: "Shirodhara",
    description: "A continuous stream of warm oil on the forehead to calm the mind.",
    icon: <Sun className="h-6 w-6 text-primary" />,
  },
];

export default function PractitionerTherapiesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Therapy Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Available Therapies</CardTitle>
          <CardDescription>
            A list of all therapies offered at the clinic.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {therapies.map((therapy) => (
            <Card key={therapy.name}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 bg-primary/10 rounded-full">
                    {therapy.icon}
                </div>
                <div>
                    <CardTitle className="text-lg font-headline">{therapy.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{therapy.description}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

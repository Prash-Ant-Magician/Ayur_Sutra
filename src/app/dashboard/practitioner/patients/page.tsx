
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { format } from "date-fns"

export default async function PatientsListPage() {
  const patientsQuery = query(collection(db, "users"), where("role", "==", "patient"));
  const patientsSnapshot = await getDocs(patientsQuery);
  const patients = patientsSnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        avatar: `https://picsum.photos/seed/${doc.id}/200/200`,
        dob: data.dob?.toDate ? format(data.dob.toDate(), "PPP") : 'N/A', // Assuming dob is a timestamp
        gender: doc.data().gender || 'N/A',
     }
   });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Patient Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>
            A list of all patients registered on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead className="hidden sm:table-cell">Gender</TableHead>
                <TableHead className="hidden md:table-cell">Date of Birth</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback>{patient.name ? patient.name[0] : 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">{patient.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{patient.gender}</TableCell>
                  <TableCell className="hidden md:table-cell">{patient.dob}</TableCell>
                  <TableCell>
                     <Button variant="outline" asChild>
                      <Link href={`/dashboard/practitioner/patients/${patient.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

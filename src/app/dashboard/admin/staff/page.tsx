
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
import Link from "next/link"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Practitioner } from "@/lib/types"

export default async function AdminStaffPage() {
  const practitionersQuery = query(collection(db, "practitioners"));
  const practitionersSnapshot = await getDocs(practitionersQuery);
  const practitioners = practitionersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Practitioner));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Staff Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Therapists & Staff</CardTitle>
          <CardDescription>
            A list of all practitioners and staff registered on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead className="hidden sm:table-cell">Specialty</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {practitioners.map((practitioner) => (
                <TableRow key={practitioner.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={practitioner.avatar} alt={practitioner.name} />
                        <AvatarFallback>{practitioner.name ? practitioner.name[0] : 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{practitioner.name}</div>
                        <div className="text-sm text-muted-foreground">{practitioner.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{practitioner.specialty}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(practitioner.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell>
                     <Button variant="outline" asChild>
                      {/* This could link to a detailed staff view page in the future */}
                      <Link href="#">View Details</Link>
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

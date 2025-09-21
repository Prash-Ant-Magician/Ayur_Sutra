
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Chat } from "@/components/messaging/chat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Practitioner } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";

export default function MessagingPage() {
    const { user } = useAuth();
    const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
    const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPractitioners = async () => {
            const practitionersQuery = query(collection(db, "practitioners"));
            const practitionersSnapshot = await getDocs(practitionersQuery);
            const practitionerList = practitionersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Practitioner));
            setPractitioners(practitionerList);
            if (practitionerList.length > 0) {
                setSelectedPractitioner(practitionerList[0]);
            }
            setLoading(false);
        };
        fetchPractitioners();
    }, []);

    if (loading) {
        return (
             <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold font-headline mb-8">Secure Messaging</h1>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-96 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    const handlePractitionerSelect = (practitionerId: string) => {
        const practitioner = practitioners.find(p => p.id === practitionerId);
        setSelectedPractitioner(practitioner || null);
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Secure Messaging</h1>
            
            {practitioners.length > 1 && (
                <div className="mb-6 max-w-sm">
                    <Select onValueChange={handlePractitionerSelect} defaultValue={selectedPractitioner?.id}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a practitioner to chat with" />
                        </SelectTrigger>
                        <SelectContent>
                            {practitioners.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name} - {p.specialty}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            
            {user && selectedPractitioner ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Chat with {selectedPractitioner.name}</CardTitle>
                        <CardDescription>This is a secure and private channel. Do not share sensitive information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Chat
                            sender={{ id: user.uid, name: user.displayName || "Me", avatar: user.photoURL || undefined }}
                            receiver={{ id: selectedPractitioner.id, name: selectedPractitioner.name, avatar: selectedPractitioner.avatar }}
                        />
                    </CardContent>
                </Card>
            ) : (
                 <div className="text-center py-16 border rounded-lg">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No Practitioners Available</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        There are currently no practitioners available to chat with.
                    </p>
                </div>
            )}
        </div>
    );
}

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ContentManagementForm } from "@/components/dashboard/admin/content-management-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ContentManagementPage() {
    const docRef = doc(db, "pages", "about-us");
    const docSnap = await getDoc(docRef);

    let initialData = {
        title: "About Ayur Sutra",
        subtitle: "Fusing ancient Ayurvedic wisdom with modern technology to create a seamless path to holistic well-being.",
        story_p1: "Ayur Sutra was born from a desire to make holistic Ayurvedic care more accessible and manageable in today's fast-paced world. We saw a gap between traditional practices and the needs of modern individuals seeking a balanced lifestyle.",
        story_p2: "Our platform is designed to bridge that gap, providing intuitive tools for both patients and practitioners to connect, manage treatments, and embark on a journey toward optimal health together. We believe in empowering individuals with the knowledge and resources to integrate Ayurveda into their daily lives."
    };

    if (docSnap.exists()) {
        initialData = { ...initialData, ...docSnap.data() };
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Content Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>About Us Page</CardTitle>
                    <CardDescription>
                        Update the content for the public "About Us" page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContentManagementForm initialData={initialData} />
                </CardContent>
            </Card>
        </div>
    );
}

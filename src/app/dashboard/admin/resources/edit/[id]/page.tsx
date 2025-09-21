
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceForm } from "@/components/dashboard/admin/resources/resource-form";
import { db } from "@/lib/firebase";
import { ResourceArticle } from "@/lib/types";
import { doc, getDoc } from "firebase/firestore";

export default async function EditResourcePage({ params }: { params: { id: string } }) {
    const docRef = doc(db, "resources", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return <div className="container mx-auto py-8">Article not found.</div>;
    }

    const article = { id: docSnap.id, ...docSnap.data() } as ResourceArticle;

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Edit Article</CardTitle>
                    <CardDescription>Update the content for the article titled "{article.title}".</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResourceForm article={article} />
                </CardContent>
            </Card>
        </div>
    );
}

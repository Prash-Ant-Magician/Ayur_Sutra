
import { db } from "@/lib/firebase";
import { ResourceArticle } from "@/lib/types";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { PublicPageHeader } from "@/components/layout/public-page-header";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default async function ResourceDetailPage({ params }: { params: { id: string } }) {
    const docRef = doc(db, "resources", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                 <PublicPageHeader currentPage="resources" />
                 <main className="flex-1">
                    <div className="container mx-auto py-24 text-center">
                        <h1 className="text-4xl font-bold font-headline">Article Not Found</h1>
                        <p className="text-muted-foreground mt-4">The resource you are looking for does not exist.</p>
                    </div>
                </main>
            </div>
        );
    }

    const article = { id: docSnap.id, ...docSnap.data() } as ResourceArticle;
    const formattedDate = article.createdAt ? format(article.createdAt.toDate(), "MMMM dd, yyyy") : 'Date not available';

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <PublicPageHeader currentPage="resources" />
            <main className="flex-1">
                <article className="container mx-auto max-w-4xl py-12">
                    <header className="mb-8">
                        <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">{article.title}</h1>
                        <p className="text-muted-foreground text-sm">Posted on {formattedDate}</p>
                    </header>
                    <Image 
                        src={article.imageUrl} 
                        alt={article.title} 
                        width={800} 
                        height={450} 
                        className="w-full rounded-lg shadow-lg mb-8 aspect-video object-cover"
                        data-ai-hint={article.imageHint}
                    />
                    <div className="prose max-w-none text-foreground/90">
                       {article.content}
                    </div>
                </article>
            </main>
        </div>
    );
}

// Add a basic prose style to globals.css if it doesn't exist
// This is just a placeholder; you'd typically use @tailwindcss/typography
// For this example, I'll just add some basic styles to globals.css to make it look decent.
// In a real app, you would run `npm install -D @tailwindcss/typography` and add `require('@tailwindcss/typography')` to your tailwind.config.js plugins.
// I will not do that here. I'll just add some minimal styles to globals.css.

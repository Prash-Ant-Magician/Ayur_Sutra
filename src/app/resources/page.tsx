
import { db } from "@/lib/firebase";
import { ResourceArticle } from "@/lib/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PublicPageHeader } from "@/components/layout/public-page-header";

export default async function ResourcesPage() {
    const resourcesQuery = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const resourcesSnapshot = await getDocs(resourcesQuery);
    const articles = resourcesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as ResourceArticle));

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <PublicPageHeader currentPage="resources" />
            <main className="flex-1">
                <section className="py-20 text-center bg-primary/10">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Wellness Resources</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           Explore our collection of articles and guides on Ayurveda, wellness, and holistic health.
                        </p>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto">
                        {articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articles.map(article => (
                                    <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                                        <Image src={article.imageUrl} alt={article.title} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={article.imageHint} />
                                        <CardHeader>
                                            <CardTitle className="font-headline text-xl">{article.title}</CardTitle>
                                            <CardDescription className="text-sm text-primary font-semibold">{article.category}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-muted-foreground text-sm">{article.summary}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild>
                                                <Link href={`/resources/${article.id}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <h2 className="text-2xl font-semibold">No Resources Found</h2>
                                <p className="text-muted-foreground mt-2">Please check back later for articles and guides.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

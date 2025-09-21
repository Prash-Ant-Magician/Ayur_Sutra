
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { ResourceArticle } from "@/lib/types";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { format } from "date-fns";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteResourceButton } from "@/components/dashboard/admin/resources/delete-resource-button";


export default async function AdminResourcesPage() {
    const resourcesQuery = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const resourcesSnapshot = await getDocs(resourcesQuery);
    const articles = resourcesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            createdAt: data.createdAt ? format(data.createdAt.toDate(), "PPP") : 'N/A',
            ...data
        } as ResourceArticle;
    });

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-headline">Resource Management</h1>
                <Button asChild>
                    <Link href="/dashboard/admin/resources/add">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Articles</CardTitle>
                    <CardDescription>
                        Manage your educational content for patients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date Published</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-medium">{article.title}</TableCell>
                                    <TableCell>{article.category}</TableCell>
                                    <TableCell>{article.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/admin/resources/edit/${article.id}`} className="flex items-center gap-2">
                                                        <Edit className="h-4 w-4" /> Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DeleteResourceButton articleId={article.id} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

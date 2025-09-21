"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ResourceArticle } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  summary: z.string().min(20, "Summary must be at least 20 characters."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  category: z.string().min(3, "Category is required."),
  imageUrl: z.string().url("Must be a valid URL."),
  imageHint: z.string().min(2, "Image hint is required."),
});

interface ResourceFormProps {
    article?: ResourceArticle;
}

export function ResourceForm({ article }: ResourceFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: article || {
            title: "",
            summary: "",
            content: "",
            category: "Wellness",
            imageUrl: "https://picsum.photos/seed/resource/400/250",
            imageHint: "wellness article",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            if (article) {
                // Update existing article
                const docRef = doc(db, "resources", article.id);
                await setDoc(docRef, values, { merge: true });
                toast({ title: "Article Updated", description: "The resource article has been successfully updated." });
            } else {
                // Create new article
                await addDoc(collection(db, "resources"), {
                    ...values,
                    createdAt: serverTimestamp(),
                });
                toast({ title: "Article Published", description: "The new resource article is now live." });
            }
            router.push("/dashboard/admin/resources");
            router.refresh();
        } catch (error) {
            console.error("Error saving article:", error);
            toast({
                title: "Save Failed",
                description: "Could not save the article. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Wellness">Wellness</SelectItem>
                                    <SelectItem value="Ayurveda">Ayurveda</SelectItem>
                                    <SelectItem value="Mental Health">Mental Health</SelectItem>
                                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                                </SelectContent>
                            </Select>
                          <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl><Textarea {...field} rows={3} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Content</FormLabel>
                            <FormControl><Textarea {...field} rows={10} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="imageHint"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image AI Hint</FormLabel>
                            <FormControl><Input placeholder="e.g. 'healthy food' or 'meditation'" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {article ? 'Update' : 'Publish'} Article
                </Button>
            </form>
        </Form>
    );
}

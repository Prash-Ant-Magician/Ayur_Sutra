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
import { Loader2 } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  subtitle: z.string().min(10, "Subtitle must be at least 10 characters."),
  story_p1: z.string().min(20, "Story paragraph 1 must be at least 20 characters."),
  story_p2: z.string().min(20, "Story paragraph 2 must be at least 20 characters."),
});

type ContentManagementFormProps = {
    initialData: z.infer<typeof formSchema>;
}

export function ContentManagementForm({ initialData }: ContentManagementFormProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const pageRef = doc(db, "pages", "about-us");
            await setDoc(pageRef, values, { merge: true });
            toast({
                title: "Content Updated",
                description: "The 'About Us' page has been successfully updated.",
            });
        } catch (error) {
            console.error("Error updating content:", error);
            toast({
                title: "Update Failed",
                description: "Could not update the content. Please try again.",
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
                            <FormLabel>Page Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Page Subtitle</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="story_p1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Story (Paragraph 1)</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="story_p2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Story (Paragraph 2)</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Content
                </Button>
            </form>
        </Form>
    );
}

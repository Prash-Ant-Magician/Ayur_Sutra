"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteResourceButton({ articleId }: { articleId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "resources", articleId));
            toast({
                title: "Article Deleted",
                description: "The resource article has been successfully deleted.",
            });
            router.refresh();
        } catch (error) {
            console.error("Error deleting article:", error);
            toast({
                title: "Deletion Failed",
                description: "Could not delete the article. Please try again.",
                variant: "destructive",
            });
        }
        setIsOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                    <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the article.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

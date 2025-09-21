
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const formSchema = z.object({
  painLevel: z.number().min(0).max(10),
  mobilityScore: z.number().min(0).max(10),
  wellbeing: z.number().min(0).max(10),
  notes: z.string().min(10, { message: "Session notes must be at least 10 characters." }),
});

export function LogProgressForm({ patientId, onProgressLogged }: { patientId: string, onProgressLogged: () => void }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      painLevel: 5,
      mobilityScore: 5,
      wellbeing: 5,
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const progressRef = collection(db, `users/${patientId}/progress_notes`);
      await addDoc(progressRef, {
        date: new Date().toISOString(),
        ...values,
      });

      toast({
        title: "Progress Logged",
        description: "The patient's session notes have been saved.",
      });
      form.reset();
      onProgressLogged(); // Callback to refresh the chart
    } catch (error) {
      console.error("Error logging progress:", error);
      toast({
        title: "Error",
        description: "Could not save progress. Please try again.",
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
          name="painLevel"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Pain Level: {value}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[value]}
                  max={10}
                  step={1}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobilityScore"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Mobility Score: {value}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[value]}
                  max={10}
                  step={1}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="wellbeing"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Well-being Score: {value}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[value]}
                  max={10}
                  step={1}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter session notes here..." {...field} rows={4}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Log Progress
        </Button>
      </form>
    </Form>
  );
}

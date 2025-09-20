"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalizedPrecautionGeneration, PersonalizedPrecautionInput } from "@/ai/flows/personalized-precaution-generation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import type { Patient } from "@/lib/types";

const formSchema = z.object({
  procedureDetails: z.string().min(10, "Please provide more details about the procedure."),
});

type PrecautionOutput = {
  preProcedurePrecautions: string;
  postProcedurePrecautions: string;
};

export function PrecautionGenerator({ patient }: { patient: Patient }) {
  const [precautions, setPrecautions] = useState<PrecautionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { procedureDetails: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrecautions(null);

    const input: PersonalizedPrecautionInput = {
      medicalHistory: patient.medicalHistory,
      symptoms: patient.symptoms,
      currentTherapies: patient.currentTherapies,
      procedureDetails: values.procedureDetails,
    };

    try {
      const result = await personalizedPrecautionGeneration(input);
      setPrecautions(result);
    } catch (error) {
      console.error("Error generating precautions:", error);
      // Handle error display
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-primary"/>
            Personalized Precaution Generation
        </CardTitle>
        <CardDescription>
          Generate tailored pre- and post-procedure precautions based on the patient's profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="procedureDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Procedure Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Panchakarma therapy, 7-day course" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Precautions
            </Button>
          </form>
        </Form>
        {precautions && (
          <div className="mt-6 space-y-4 pt-6 border-t">
            <div>
              <h4 className="font-semibold">Pre-Procedure Precautions</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{precautions.preProcedurePrecautions}</p>
            </div>
            <div>
              <h4 className="font-semibold">Post-Procedure Precautions</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{precautions.postProcedurePrecautions}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

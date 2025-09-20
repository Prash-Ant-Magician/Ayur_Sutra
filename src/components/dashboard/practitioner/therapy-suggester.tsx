"use client";

import { useState } from "react";
import { suggestTherapyBasedOnProfile } from "@/ai/flows/suggest-therapy-based-on-profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";

type TherapySuggestionOutput = {
  therapySuggestion: string;
  reason: string;
};

export function TherapySuggester({ profile }: { profile: string }) {
  const [suggestion, setSuggestion] = useState<TherapySuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggest = async () => {
    setIsLoading(true);
    setSuggestion(null);

    try {
      const result = await suggestTherapyBasedOnProfile({ profile });
      setSuggestion(result);
    } catch (error) {
      console.error("Error suggesting therapy:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-primary"/>
            AI Therapy Suggestion
        </CardTitle>
        <CardDescription>
          Get an AI-powered therapy suggestion based on the patient's full profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSuggest} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Suggest Therapy
        </Button>
        {suggestion && (
          <div className="mt-6 space-y-4 pt-6 border-t">
            <div>
              <h4 className="font-semibold">Suggested Therapy</h4>
              <p className="text-lg text-primary font-bold">{suggestion.therapySuggestion}</p>
            </div>
            <div>
              <h4 className="font-semibold">Reasoning</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{suggestion.reason}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { ChatbotClient } from "@/components/dashboard/patient/chatbot-client";

export default function ChatbotPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="container mx-auto py-8 flex-1 flex flex-col">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline">AI Assistant</h1>
            <p className="text-muted-foreground">Ask me anything about your treatment or appointments.</p>
        </div>
        <ChatbotClient />
      </div>
    </div>
  );
}

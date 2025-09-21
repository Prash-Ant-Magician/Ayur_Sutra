"use client";

import { useAuth } from "@/context/auth-context";
import { FloatingPatientChatbot } from "@/components/dashboard/patient/floating-patient-chatbot";

export function FloatingChatbotWrapper() {
    const { userRole } = useAuth();

    if (userRole === 'patient') {
        return <FloatingPatientChatbot />;
    }

    return null;
}

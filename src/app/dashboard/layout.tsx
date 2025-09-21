import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/layout/dashboard-nav';
import { FloatingPatientChatbot } from '@/components/dashboard/patient/floating-patient-chatbot';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { FloatingChatbotWrapper } from '@/components/layout/floating-chatbot-wrapper';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardNav />
      </Sidebar>
      <SidebarInset>
        {children}
        <FloatingChatbotWrapper />
      </SidebarInset>
    </SidebarProvider>
  );
}

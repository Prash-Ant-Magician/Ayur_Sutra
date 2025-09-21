"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Calendar,
  Users,
  HeartPulse,
  BarChart,
  Settings,
  LogOut,
  Bot,
  Bell,
  BookMarked,
  UserPlus,
  FileText,
  Library,
  MessageSquare,
} from 'lucide-react';
import { Logo } from './logo';
import { Button } from '../ui/button';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';


const patientLinks = [
  { href: '/dashboard/patient', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/patient/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/patient/messaging', label: 'Messaging', icon: MessageSquare },
  { href: '/dashboard/patient/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/patient/settings', label: 'Settings', icon: Settings },
];

const practitionerLinks = [
  { href: '/dashboard/practitioner', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/practitioner/patients', label: 'Patients', icon: Users },
  { href: '/dashboard/practitioner/therapies', label: 'Therapies', icon: HeartPulse },
];

const adminLinks = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/book-appointment', label: 'Book Appointment', icon: BookMarked },
  { href: '/dashboard/admin/add-patient', label: 'Add Patient', icon: UserPlus },
  { href: '/dashboard/admin/add-practitioner', label: 'Add Practitioner', icon: UserPlus },
  { href: '/dashboard/admin/patients', label: 'Patients', icon: Users },
  { href: '/dashboard/admin/staff', label: 'Therapists/Staff', icon: Users },
  { href: '/dashboard/admin/content', label: 'Content', icon: FileText },
  { href: '/dashboard/admin/resources', label: 'Resources', icon: Library },
  { href: '/dashboard/admin/reports', label: 'Reports & Analytics', icon: BarChart },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { user, userRole } = useAuth();
  const router = useRouter();

  const links =
    userRole === 'patient'
      ? patientLinks
      : userRole === 'practitioner'
      ? practitionerLinks
      : adminLinks;

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const getRoleTitle = () => {
      if (userRole === 'patient') return 'Patient';
      if (userRole === 'practitioner') return 'Practitioner';
      if (userRole === 'admin') return 'Admin';
      return 'User';
  }

  return (
    <>
      <SidebarHeader className="h-20 p-4">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10 text-sidebar-foreground" />
          <div>
            <p className="text-xl font-semibold font-headline text-sidebar-foreground">Ayur Sutra</p>
            <p className="text-sm text-sidebar-foreground/80">{getRoleTitle()}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(link.href) && (link.href !== '/dashboard/admin' || pathname === '/dashboard/admin')}
                  className="font-headline text-base"
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
      </SidebarFooter>
    </>
  );
}

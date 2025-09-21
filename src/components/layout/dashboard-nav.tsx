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
  SidebarGroup,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Calendar,
  Users,
  HeartPulse,
  BarChart,
  Settings,
  LogOut,
  User,
  LifeBuoy,
  Bot,
  Bell
} from 'lucide-react';
import { Logo } from './logo';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const patientLinks = [
  { href: '/dashboard/patient', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/patient/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/patient/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/patient/chatbot', label: 'AI Assistant', icon: Bot },
  { href: '/dashboard/patient/settings', label: 'Settings', icon: Settings },
];

const practitionerLinks = [
  { href: '/dashboard/practitioner', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/practitioner/patients', label: 'Patients', icon: Users },
  { href: '#', label: 'Therapies', icon: HeartPulse },
];

const adminLinks = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'Patients', icon: Users },
  { href: '#', label: 'Therapists/Staff', icon: Users },
  { href: '#', label: 'Reports & Analytics', icon: BarChart },
  { href: '#', label: 'Settings', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  const getRole = () => {
    if (pathname.startsWith('/dashboard/patient')) return 'patient';
    if (pathname.startsWith('/dashboard/practitioner')) return 'practitioner';
    if (pathname.startsWith('/dashboard/admin')) return 'admin';
    return 'practitioner'; // Default to practitioner for this view
  };

  const role = getRole();

  const links =
    role === 'patient'
      ? patientLinks
      : role === 'practitioner'
      ? practitionerLinks
      : adminLinks;

  const getUsername = () => {
    if (role === 'patient') return 'Alice Johnson';
    if (role === 'practitioner') return 'Dr. Evelyn Reed';
    if (role === 'admin') return 'Admin';
    return 'User';
  }

  const getAvatar = () => {
    if (role === 'patient') return 'https://picsum.photos/seed/avatar1/200/200';
    if (role === 'practitioner') return 'https://picsum.photos/seed/avatar4/200/200';
    if (role === 'admin') return 'https://picsum.photos/seed/avatar6/200/200';
    return 'https://picsum.photos/seed/avatar/200/200';
  }
  
  const getRoleTitle = () => {
      if (role === 'patient') return 'Patient';
      if (role === 'practitioner') return 'Practitioner';
      if (role === 'admin') return 'Admin';
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
                  isActive={pathname === link.href}
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
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </Link>
      </SidebarFooter>
    </>
  );
}

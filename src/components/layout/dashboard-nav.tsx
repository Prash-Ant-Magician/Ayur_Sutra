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
  Bot,
  Calendar,
  HeartPulse,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  Users,
  Bell
} from 'lucide-react';
import { Logo } from './logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

const patientLinks = [
  { href: '/dashboard/patient', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/patient/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/patient/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/patient/chatbot', label: 'AI Assistant', icon: Bot },
];

const practitionerLinks = [
  { href: '/dashboard/practitioner', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/practitioner/patients', label: 'Patients', icon: Users },
  { href: '#', label: 'Therapies', icon: HeartPulse },
];

const adminLinks = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'User Management', icon: Users },
  { href: '#', label: 'System Config', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  const getRole = () => {
    if (pathname.startsWith('/dashboard/patient')) return 'patient';
    if (pathname.startsWith('/dashboard/practitioner')) return 'practitioner';
    if (pathname.startsWith('/dashboard/admin')) return 'admin';
    return null;
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
    if (role === 'admin') return 'Admin User';
    return 'User';
  }

  const getAvatar = () => {
    if (role === 'patient') return 'https://picsum.photos/seed/avatar1/200/200';
    if (role === 'practitioner') return 'https://picsum.photos/seed/avatar4/200/200';
    if (role === 'admin') return 'https://picsum.photos/seed/avatar6/200/200';
    return 'https://picsum.photos/seed/avatar/200/200';
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold font-headline">AyurSutra</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  className="font-headline"
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-14">
               <Avatar className="h-10 w-10">
                <AvatarImage src={getAvatar()} alt={getUsername()} />
                <AvatarFallback>{getUsername().charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium">{getUsername()}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
             <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}

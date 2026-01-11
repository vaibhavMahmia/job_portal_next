'use client';

import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Plus,
  Briefcase,
  Bookmark,
  CreditCard,
  Building,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react';

const base = "/dashboard/employer";
const navigationItems = [
  { name: "Overview", icon: LayoutDashboard, href: base + "/" },
  { name: "Employers Profile", icon: User },
  { name: "Post a Job", icon: Plus, href: base + "/jobs" },
  { name: "My Jobs", icon: Briefcase, href: base + "/joblist" },
  { name: "Saved Candidate", icon: Bookmark },
  { name: "Plans & Billing", icon: CreditCard },
  { name: "All Companies", icon: Building },
  { name: "Settings", icon: Settings, href: base + "/settings" },
];

export const EmployerSidebar: React.FC = () => {
  const pathname = usePathname();

  const isLinkActive = ({ href, pathname, base = '/' }: { href: string; pathname: string; base?: string }) => {
    const normalizedHref = href.replace(/\/$/, "") || "/";
    if (normalizedHref === base) return pathname === base || pathname === base + "/";
    return pathname.startsWith(normalizedHref);
  }

  return <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
    <div className="p-6">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Employers Dashboard
      </h2>
    </div>

    <nav className="px-3 space-y-1">
      {navigationItems.map((curNav) => {
        const Icon = curNav.icon;
        return <Link key={curNav.name} href={curNav.href || '#'} className={cn(
          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          isLinkActive({
            href: curNav.href || "#",
            pathname,
            base: "/dashboard/employer",
          }) && "text-white bg-teal-500"
        )}>
          <Icon />
          {curNav.name}
        </Link>;
      })}
    </nav>

    <div className="absolute bottom-6 left-3 right-3">
      <button onClick={logoutUserAction} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full">
        <LogOut className="h-4 w-4" />
        Log-out
      </button>
    </div>
  </div>;
}
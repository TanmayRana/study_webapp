"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  // Removed items property since submenu is not needed
};

export function NavMain({ items }: { items: NavItem[] }) {
  const { state } = useSidebar();
  const path = usePathname();
  const { theme } = useTheme();
  console.log("themes", theme);
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {/* {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <Link
                href={item.url}
                className={item.isActive ? "font-semibold" : undefined}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))} */}
        {items.map((item) => {
          const isActive = path === item.url;

          return (
            <SidebarMenuItem
              key={item.title}
              className="group/menu-item relative"
            >
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                className={`h-12 w-full px-3 flex items-center gap-2 transition-all ${
                  isActive
                    ? `font-semibold bg-[#2a44cb] text-white dark:bg-sidebar-accent dark:text-sidebar-accent-foreground ${
                        theme === "light"
                          ? "hover:hover:bg-[#2a44cb] hover:text-white"
                          : ""
                      }  `
                    : "text-foreground hover:bg-[#2a44cb] hover:text-white dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground"
                }`}
              >
                <Link
                  href={item.url}
                  aria-current={isActive ? "page" : undefined}
                  className="flex items-center gap-2 w-full px-3"
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  )}
                  {state !== "collapsed" && <span>{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

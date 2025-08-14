"use client";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";

type DashboardProviderProps = {
  children: React.ReactNode;
};

const DashboardProvider = ({ children }: DashboardProviderProps) => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-40 justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <div className="flex items-center gap-2 pr-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
    </SidebarInset>
  </SidebarProvider>
);

export default DashboardProvider;

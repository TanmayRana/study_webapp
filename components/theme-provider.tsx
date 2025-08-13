"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import DashboardProvider from "@/app/_components/DashboardProvider";
// import DashboardProvider from "@/app/_components/DashboardProvider";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {/* <DashboardProvider>{children}</DashboardProvider> */}
      {children}
    </NextThemesProvider>
  );
}

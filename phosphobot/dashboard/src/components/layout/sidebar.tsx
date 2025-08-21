import { AppSidebar } from "@/components/common/app-sidebar";

// This file is now just a wrapper - the actual Sidebar component 
// is used directly in layout.tsx with the SidebarProvider
export function Sidebar() {
  return <AppSidebar />;
}
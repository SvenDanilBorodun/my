import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BrainCircuit,
  Camera,
  Code,
  Dumbbell,
  FileCog,
  FolderOpen,
  Home,
  Network,
  Play,
  Sliders,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      title: "Navigation",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: Home,
          gradient: "from-blue-500 to-blue-600",
          active: currentPath === "/"
        }
      ]
    },
    {
      title: "Control & Record",
      items: [
        {
          title: "Control Robot",
          url: "/control",
          icon: Play,
          gradient: "from-emerald-500 to-emerald-600",
          active: currentPath === "/control"
        },
        {
          title: "Browse Datasets",
          url: "/browse",
          icon: FolderOpen,
          gradient: "from-orange-500 to-orange-600",
          active: currentPath.startsWith("/browse")
        },
        {
          title: "Calibration",
          url: "/calibration",
          icon: Sliders,
          gradient: "from-purple-500 to-purple-600",
          active: currentPath === "/calibration"
        }
      ]
    },
    {
      title: "AI & Training",
      items: [
        {
          title: "AI Training",
          url: "/train",
          icon: Dumbbell,
          gradient: "from-pink-500 to-pink-600",
          active: currentPath === "/train"
        },
        {
          title: "AI Control",
          url: "/inference",
          icon: BrainCircuit,
          gradient: "from-violet-500 to-violet-600",
          active: currentPath === "/inference"
        }
      ]
    },
    {
      title: "Advanced Settings",
      items: [
        {
          title: "Admin Configuration",
          url: "/admin",
          icon: FileCog,
          gradient: "from-gray-500 to-gray-600",
          active: currentPath === "/admin"
        },
        {
          title: "API Documentation",
          url: "/docs",
          icon: Code,
          gradient: "from-indigo-500 to-indigo-600",
          active: currentPath === "/docs"
        },
        {
          title: "Camera Overview",
          url: "/viz",
          icon: Camera,
          gradient: "from-green-500 to-green-600",
          active: currentPath === "/viz"
        },
        {
          title: "Network Management",
          url: "/network",
          icon: Network,
          gradient: "from-cyan-500 to-cyan-600",
          active: currentPath === "/network"
        }
      ]
    }
  ];

  return (
    <Sidebar className="glass border-r border-blue-200/30 pt-16 backdrop-blur-lg">
      <SidebarContent className="bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/20">
        {menuItems.map((section) => (
          <SidebarGroup key={section.title} className="mb-6">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2 px-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.active}
                        className={`group relative overflow-hidden rounded-lg transition-all duration-200 hover:shadow-lg ${
                          item.active 
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                            : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950/20 dark:hover:to-blue-900/20'
                        }`}
                      >
                        <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                          <div className={`p-1 rounded-md transition-colors ${
                            item.active
                              ? 'bg-white/20'
                              : 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-sm">{item.title}</span>
                          {item.active && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                            </div>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
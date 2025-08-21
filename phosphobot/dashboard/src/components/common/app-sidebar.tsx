import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarSeparator,
  SidebarRail,
  useSidebar,
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
  Sparkles,
  MoreHorizontal,
  ChevronUp,
  Settings,
  User2,
  HelpCircle,
  Bot,
  ChevronRight,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

const sidebarVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  closed: {
    opacity: 0.8,
    x: -10,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
  },
};

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { state } = useSidebar();
  const { session } = useAuth();

  const menuItems = [
    {
      title: "Navigation",
      icon: Home,
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: Home,
          gradient: "from-blue-500 to-blue-600",
          active: currentPath === "/",
        }
      ]
    },
    {
      title: "Control & Record",
      icon: Play,
      items: [
        {
          title: "Control Robot",
          url: "/control",
          icon: Play,
          gradient: "from-emerald-500 to-emerald-600",
          active: currentPath === "/control",
        },
        {
          title: "Browse Datasets",
          url: "/browse",
          icon: FolderOpen,
          gradient: "from-orange-500 to-orange-600",
          active: currentPath.startsWith("/browse"),
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
      icon: BrainCircuit,
      items: [
        {
          title: "AI Training",
          url: "/train",
          icon: Dumbbell,
          gradient: "from-pink-500 to-pink-600",
          active: currentPath === "/train",
        },
        {
          title: "AI Control",
          url: "/inference",
          icon: BrainCircuit,
          gradient: "from-violet-500 to-violet-600",
          active: currentPath === "/inference",
        }
      ]
    },
    {
      title: "Advanced Settings",
      icon: Settings,
      items: [
        {
          title: "Admin Configuration",
          url: "/admin",
          icon: FileCog,
          gradient: "from-red-500 to-red-600",
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
    <Sidebar collapsible="icon" className="glass-enhanced border-r border-white/20 backdrop-blur-xl">
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate="open"
        className="h-full"
      >
        <SidebarHeader className="p-4 border-b border-white/10">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="relative">
              <motion.div 
                className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 text-white shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles className="size-5" />
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl blur opacity-30 animate-pulse" />
              </motion.div>
            </div>
            <AnimatePresence mode="wait">
              {state === "expanded" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="grid flex-1 text-left text-sm leading-tight"
                >
                  <span className="truncate font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                    EduBotics
                  </span>
                  <span className="truncate text-xs text-muted-foreground font-medium">
                    AI Robotics Platform
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          {menuItems.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <Collapsible key={section.title} defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <motion.div variants={itemVariants}>
                    <SidebarGroupLabel 
                      asChild 
                      className="text-xs font-bold text-sidebar-foreground/80 uppercase tracking-wider mb-2 flex items-center gap-2 hover:text-sidebar-foreground transition-colors group-data-[collapsible=icon]:justify-center"
                    >
                      <CollapsibleTrigger className="w-full justify-start">
                        <SectionIcon className="size-4 text-blue-500" />
                        <AnimatePresence mode="wait">
                          {state === "expanded" && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                            >
                              {section.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {state === "expanded" && (
                          <ChevronRight className="ml-auto size-3 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                  </motion.div>
                  
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu className="space-y-1">
                        {section.items.map((item, itemIndex) => {
                          const Icon = item.icon;
                          return (
                            <motion.div 
                              key={item.url}
                              variants={itemVariants}
                              custom={itemIndex}
                              className="relative group"
                            >
                              <SidebarMenuItem>
                                <SidebarMenuButton
                                  asChild
                                  isActive={item.active}
                                  className={cn(
                                    "relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
                                    item.active 
                                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl border border-white/20` 
                                      : "hover:bg-sidebar-accent/50 border border-transparent hover:border-white/10"
                                  )}
                                >
                                  <Link 
                                    to={item.url}
                                    className="flex items-center gap-3 w-full"
                                  >
                                    <motion.div
                                      className="flex items-center gap-3 w-full"
                                      whileHover={{ x: 2 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                      <motion.div
                                        className="relative"
                                        whileHover={{ rotate: item.active ? 0 : 12, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                      >
                                        <Icon className={cn(
                                          "size-5",
                                          item.active ? "text-white" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                                        )} />
                                        {item.active && (
                                          <div className="absolute -inset-1 bg-white/20 rounded-full blur animate-pulse" />
                                        )}
                                      </motion.div>
                                      <AnimatePresence mode="wait">
                                        {state === "expanded" && (
                                          <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="font-medium"
                                          >
                                            {item.title}
                                          </motion.span>
                                        )}
                                      </AnimatePresence>
                                      {(item as any).badge && state === "expanded" && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="ml-auto"
                                        >
                                          <Badge 
                                            variant={item.active ? "secondary" : "outline"} 
                                            className={cn(
                                              "text-xs px-1.5 py-0.5 font-medium",
                                              item.active 
                                                ? "bg-white/20 text-white border-white/30" 
                                                : "bg-sidebar-accent/30 text-sidebar-foreground/70"
                                            )}
                                          >
                                            {(item as any).badge}
                                          </Badge>
                                        </motion.div>
                                      )}
                                      {item.active && state === "expanded" && (
                                        <motion.div 
                                          className="ml-auto size-2 rounded-full bg-white/80" 
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        />
                                      )}
                                    </motion.div>
                                  </Link>
                                </SidebarMenuButton>
                                
                                {state === "expanded" && (
                                  <SidebarMenuAction showOnHover>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                          <MoreHorizontal className="size-4" />
                                        </button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent side="right" align="start">
                                        <DropdownMenuItem 
                                          onClick={() => window.open(item.url, '_blank')}
                                        >
                                          <span>Open in new tab</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <span>Add to favorites</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </SidebarMenuAction>
                                )}
                              </SidebarMenuItem>
                            </motion.div>
                          );
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
                {sectionIndex < menuItems.length - 1 && (
                  <SidebarSeparator className="my-4 bg-white/10" />
                )}
              </Collapsible>
            );
          })}
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-white/10 mt-auto">
          <AnimatePresence mode="wait">
            {state === "expanded" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-3"
              >
                {/* System Status */}
                <div className="text-center py-2">
                  <div className="text-xs text-sidebar-foreground/70 mb-2">
                    AI-Powered Robotics
                  </div>
                  <motion.div 
                    className="flex items-center justify-center gap-2 text-xs text-blue-500 font-medium"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Bot className="size-3" />
                    Ready for Innovation
                  </motion.div>
                </div>

                {/* User Section - Now at bottom */}
                {session && (
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton className="h-auto p-3 hover:bg-sidebar-accent/50 border border-transparent hover:border-white/10">
                            <Avatar className="size-8">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                                {session.user_email?.charAt(0).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-left">
                              <span className="font-medium text-sm">{session.user_email}</span>
                              <span className="text-xs text-muted-foreground">EduBotics User</span>
                            </div>
                            <ChevronUp className="ml-auto size-4" />
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start" className="w-56">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <User2 className="mr-2 size-4" />
                            Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 size-4" />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <HelpCircle className="mr-2 size-4" />
                            Help & Support
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  </SidebarMenu>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Bot className="size-4" />
                </motion.div>
                {session && (
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xs">
                      {session.user_email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarFooter>
        <SidebarRail />
      </motion.div>
    </Sidebar>
  );
}
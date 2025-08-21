import { MobileMenu } from "@/components/common/mobile-menu";
import { RobotStatusDropdown } from "@/components/common/robot-status-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActionButton } from "@/components/ui/action-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { fetcher } from "@/lib/utils";
import { ServerStatus } from "@/types";
import {
  BookText,
  BrainCircuit,
  LogOut,
  Mail,
  Sparkles,
  Zap,
  Home,
  Settings,
  Activity,
  BookOpen,
  Rocket,
} from "lucide-react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { EnhancedMenuBar } from "@/components/ui/enhanced-menu-bar";

const routeMap = [
  { path: "/", title: "Dashboard", icon: Home },
  { path: "/control", title: "Robot Control", icon: Activity },
  { path: "/calibration", title: "Calibration", icon: Settings },
  { path: "/inference", title: "AI Control", icon: BrainCircuit },
  { path: "/admin", title: "Admin Configuration", icon: Settings },
  { path: "/docs", title: "API Documentation", icon: BookText },
  { path: "/viz", title: "Camera Overview", icon: Zap },
  { path: "/network", title: "Network Management", icon: Settings },
  {
    path: "/browse",
    title: "Browse Datasets",
    icon: BookOpen,
    isPrefix: true,
  },
];

function ServerIP() {
  const { data: serverStatus } = useSWR<ServerStatus>(["/status"], ([url]) =>
    fetcher(url),
  );

  if (!serverStatus) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            className="glass-enhanced px-3 py-1.5 rounded-xl border border-white/20 cursor-pointer hover-lift"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
              {serverStatus.server_ip}:{serverStatus.server_port}
            </span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs font-medium">{serverStatus.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function RecordingStatus() {
  const { data: serverStatus } = useSWR<ServerStatus>(["/status"], ([url]) =>
    fetcher(url),
  );

  if (!serverStatus || !serverStatus.is_recording) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            className="glass-enhanced px-3 py-1.5 rounded-xl border border-red-400/30 bg-red-50/50 dark:bg-red-950/20 cursor-pointer hover-lift"
            animate={{
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.3)",
                "0 0 30px rgba(239, 68, 68, 0.6)",
                "0 0 20px rgba(239, 68, 68, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <motion.div
                  className="size-2 rounded-full bg-red-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute inset-0 size-2 rounded-full bg-red-400 animate-ping opacity-75" />
              </div>
              <span className="text-xs font-medium text-red-600 dark:text-red-400">
                REC
              </span>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-red-500" />
            <span className="font-medium">Recording Active</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function AIControlStatus() {
  const { data: serverStatus } = useSWR<ServerStatus>(["/status"], ([url]) =>
    fetcher(url),
  );

  if (!serverStatus || serverStatus.ai_running_status !== "running") {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href="/inference"
            className="glass-enhanced px-3 py-1.5 rounded-xl border border-blue-400/30 bg-blue-50/50 dark:bg-blue-950/20 cursor-pointer hover-lift block"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <BrainCircuit className="size-4 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                AI
              </span>
            </div>
          </motion.a>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            <BrainCircuit className="size-4 text-blue-500" />
            <span className="font-medium">AI Control Active</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function AccountTopBar() {
  const { session, logout } = useAuth();

  // Get first letter of email for avatar
  const getInitial = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div 
          className="relative cursor-pointer pr-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitial(session.user_email)}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-enhanced border-white/20">
        <DropdownMenuItem className="text-sm text-muted-foreground">
          <div className="flex flex-col gap-y-1">
            <div>{session.user_email}</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="mailto:contact@phospho.ai"
            className="flex items-center"
            target="_blank"
          >
            <Mail className="mr-1 h-4 w-4" />
            Contact Us
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-1 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EnhancedTopBar() {
  const currentPath = window.location.pathname;
  const { session } = useAuth();

  const matchedRoute = routeMap.find(({ path, isPrefix }) =>
    isPrefix ? currentPath.startsWith(path) : currentPath === path,
  );


  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 glass-enhanced border-b border-white/20 dark:border-white/10 backdrop-blur-[25px]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 p-4 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-blue-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-blue-950/20 pointer-events-none" />
        
        <div className="flex items-center gap-4 flex-1 relative z-10">
          <SidebarTrigger className="glass-enhanced hover:glass-glow transition-all duration-200 hover:scale-105" />
          
          {currentPath === "/" ? (
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles className="size-6" />
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  EduBotics
                </h1>
                <span className="text-xs text-muted-foreground font-medium">
                  AI-Powered Robotics Platform
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {matchedRoute?.icon ? (
                  <matchedRoute.icon className="size-5" />
                ) : (
                  <Zap className="size-5" />
                )}
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  {matchedRoute?.title ?? "EduBotics"}
                </h1>
                <span className="text-xs text-muted-foreground font-medium">
                  {currentPath.replace("/", "") || "dashboard"}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Menu Bar - Hidden on mobile, shown on larger screens */}
        <motion.div
          className="hidden lg:flex items-center justify-center flex-1 relative z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <EnhancedMenuBar />
        </motion.div>

        <motion.div 
          className="flex items-center gap-3 relative z-10"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="lg:hidden">
            <MobileMenu />
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
            <ServerIP />
            <AIControlStatus />
            <RecordingStatus />
            <RobotStatusDropdown />
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ActionButton
              variant="glass"
              size="sm"
              onClick={() => window.open("/docs", "_blank")}
              icon={<BookText className="size-4" />}
              iconPosition="left"
            >
              <span className="hidden sm:inline">Docs</span>
            </ActionButton>
          </motion.div>
          
          <ThemeToggle />
          
          <div className="flex items-center gap-2">
            {session ? (
              <AccountTopBar />
            ) : (
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ActionButton
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      window.location.href = "/sign-in";
                    }}
                  >
                    Sign in
                  </ActionButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ActionButton
                    variant="gradient"
                    size="sm"
                    gradient="blue"
                    onClick={() => {
                      window.location.href = "/sign-up";
                    }}
                    glow
                  >
                    <Rocket className="mr-1 size-4" />
                    Sign up
                  </ActionButton>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
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
} from "lucide-react";
import useSWR from "swr";
import { motion } from "framer-motion";

const routeMap = [
  { path: "/", title: "Dashboard", subtitle: "System Overview" },
  { path: "/control", title: "Robot Control", subtitle: "Live Control Interface" },
  { path: "/calibration", title: "Calibration", subtitle: "Hardware Setup" },
  { path: "/train", title: "AI Training", subtitle: "Model Development" },
  { path: "/inference", title: "AI Control", subtitle: "Intelligent Automation" },
  { path: "/admin", title: "Admin Configuration", subtitle: "System Settings" },
  { path: "/docs", title: "API Documentation", subtitle: "Developer Resources" },
  { path: "/viz", title: "Camera Overview", subtitle: "Visual Monitoring" },
  { path: "/network", title: "Network Management", subtitle: "Connectivity Settings" },
  {
    path: "/browse",
    title: "Browse Datasets",
    subtitle: "Data Management",
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
    <motion.div 
      className="glass px-3 py-1.5 rounded-xl border border-white/20 cursor-pointer hover-lift"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
        {serverStatus.server_ip}:{serverStatus.server_port}
      </span>
    </motion.div>
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
    <motion.div 
      className="glass px-3 py-1.5 rounded-xl border border-red-400/30 bg-red-50/50 dark:bg-red-950/20 cursor-pointer hover-lift"
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
    <motion.a
      href="/inference"
      className="glass px-3 py-1.5 rounded-xl border border-blue-400/30 bg-blue-50/50 dark:bg-blue-950/20 cursor-pointer hover-lift block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-2">
        <BrainCircuit className="size-4 text-blue-600 dark:text-blue-400" />
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
          AI
        </span>
      </div>
    </motion.a>
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
        <div className="relative cursor-pointer pr-1">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitial(session.user_email)}
            </AvatarFallback>
          </Avatar>
          {/* Badge overlay - hidden for EduBotics */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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

export function TopBar() {
  const currentPath = window.location.pathname;
  const { session } = useAuth();

  const matchedRoute = routeMap.find(({ path, isPrefix }) =>
    isPrefix ? currentPath.startsWith(path) : currentPath === path,
  );

  return (
    <motion.div 
      className="sticky top-0 z-50 glass-enhanced border-b border-white/20 dark:border-white/10 backdrop-blur-[25px]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/20 to-blue-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-blue-950/20 pointer-events-none" />
        
        <div className="flex items-center gap-3 flex-1 relative z-10">
          <SidebarTrigger className="glass-enhanced hover:glass-glow transition-all duration-200 hover:scale-105" />
          {currentPath === "/" ? (
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <Sparkles className="size-6" />
              </div>
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
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-lg">
                <Zap className="size-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  {matchedRoute?.title ?? "EduBotics"}
                </h1>
                <span className="text-xs text-muted-foreground font-medium">
                  {matchedRoute?.subtitle ?? "Platform"}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div 
          className="flex items-center gap-3 md:w-auto relative z-10"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MobileMenu />
          <ServerIP />
          <AIControlStatus />
          <RecordingStatus />
          <RobotStatusDropdown />
          
          <ActionButton
            variant="glass"
            size="sm"
            onClick={() => window.open("", "_blank")}
            icon={<BookText className="size-4" />}
            iconPosition="left"
          >
            <span className="hidden sm:inline">Docs</span>
          </ActionButton>
          
          <ThemeToggle />
          
          <div className="flex items-center gap-2">
            {session ? (
              <AccountTopBar />
            ) : (
              <div className="flex items-center gap-2">
                <ActionButton
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    window.location.href = "/sign-in";
                  }}
                >
                  Sign in
                </ActionButton>
                <ActionButton
                  variant="gradient"
                  size="sm"
                  gradient="blue"
                  onClick={() => {
                    window.location.href = "/sign-up";
                  }}
                  glow
                >
                  Sign up
                </ActionButton>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { ErrorBoundary } from "@/components/common/error";
import { Footer } from "@/components/layout/footer";
import { AppSidebar } from "@/components/common/app-sidebar";
import { EnhancedTopBar } from "@/components/layout/enhanced-topbar";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const layoutVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const mainVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: "easeOut" as const
    }
  }
};

export function EnhancedLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <motion.div 
        className="flex w-full h-screen overflow-hidden relative"
        variants={layoutVariants}
        initial="initial"
        animate="animate"
      >
        {/* Dynamic Background with enhanced gradients */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />
          
          {/* Animated gradient orbs */}
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-blue-400/10 via-purple-400/5 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-purple-400/10 via-pink-400/5 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </div>
        
        {/* Sidebar with enhanced AppSidebar */}
        <AppSidebar />
        
        <SidebarInset className="flex flex-col">
          {/* Enhanced TopBar */}
          <EnhancedTopBar />
          
          {/* Main Content */}
          <motion.main 
            className="flex-1 container mx-auto py-6 px-4 md:px-6 overflow-y-auto pt-[140px] md:pt-[100px] pb-[60px] relative"
            variants={mainVariants}
          >
            {/* Content background with enhanced glass effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm pointer-events-none rounded-3xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            
            <div className="relative z-10">
              <ErrorBoundary>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Outlet />
                </motion.div>
              </ErrorBoundary>
            </div>
          </motion.main>
          
          {/* Enhanced Footer */}
          <Footer />
        </SidebarInset>
        
        {/* Enhanced Toaster */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            className: "glass-enhanced border-white/20 backdrop-blur-xl",
            duration: 4000,
          }}
        />
      </motion.div>
    </SidebarProvider>
  );
}
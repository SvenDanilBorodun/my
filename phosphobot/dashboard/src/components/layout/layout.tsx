import { ErrorBoundary } from "@/components/common/error";
import { Footer } from "@/components/layout/footer";
import { AppSidebar } from "@/components/common/app-sidebar";
import { TopBar } from "@/components/layout/topbar";
import { EnhancedMenuBar } from "@/components/ui/enhanced-menu-bar";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
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

export function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <motion.div 
        className="flex w-full h-screen overflow-hidden relative"
        variants={layoutVariants}
        initial="initial"
        animate="animate"
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 pointer-events-none" />
        
        <Sidebar className="glass border-r border-blue-200/30 backdrop-blur-lg">
          <AppSidebar />
        </Sidebar>
        
        <SidebarInset className="flex flex-col">
          <TopBar />
          
          {/* Enhanced Navigation Bar - Centered between header and content */}
          <motion.div 
            className="flex justify-center px-6 py-4 border-b border-white/10 bg-gradient-to-r from-blue-50/10 via-purple-50/5 to-blue-50/10 dark:from-blue-950/10 dark:via-purple-950/5 dark:to-blue-950/10 overflow-x-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <EnhancedMenuBar className="w-auto" />
          </motion.div>
          
          <motion.main 
            className="flex-1 container mx-auto py-6 px-4 md:px-6 overflow-y-auto pb-[60px] relative"
            variants={mainVariants}
          >
            {/* Content background with glass effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm pointer-events-none rounded-3xl" />
            
            <div className="relative z-20">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </motion.main>
          <Footer />
        </SidebarInset>
        
        <Toaster 
          position="top-center" 
          toastOptions={{
            className: "glass-enhanced border-white/20",
            duration: 4000,
          }}
        />
      </motion.div>
    </SidebarProvider>
  );
}

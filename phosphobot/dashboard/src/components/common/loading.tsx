import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingPageProps {
  message?: string
  className?: string
}

export function LoadingPage({ message = "Loading...", className }: LoadingPageProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[200px] space-y-4",
      className
    )}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Loader2 className="size-8 text-primary" />
      </motion.div>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  )
}
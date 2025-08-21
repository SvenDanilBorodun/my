import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { WifiOff, AlertTriangle, CheckCircle2, XCircle, Clock, Zap } from "lucide-react"

interface StatusIndicatorProps {
  status: "connected" | "disconnected" | "loading" | "error" | "warning" | "success"
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "minimal" | "detailed" | "premium"
  label?: string
  description?: string
  showPulse?: boolean
  className?: string
}

const statusConfig = {
  connected: {
    color: "emerald",
    icon: CheckCircle2,
    bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200/50 dark:border-emerald-800/50",
    textColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
    label: "Connected"
  },
  disconnected: {
    color: "amber", 
    icon: WifiOff,
    bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
    borderColor: "border-amber-200/50 dark:border-amber-800/50", 
    textColor: "text-amber-600 dark:text-amber-400",
    dotColor: "bg-amber-500",
    label: "Disconnected"
  },
  loading: {
    color: "blue",
    icon: Clock,
    bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
    borderColor: "border-blue-200/50 dark:border-blue-800/50",
    textColor: "text-blue-600 dark:text-blue-400", 
    dotColor: "bg-blue-500",
    label: "Loading"
  },
  error: {
    color: "red",
    icon: XCircle,
    bgColor: "bg-red-50/50 dark:bg-red-950/20",
    borderColor: "border-red-200/50 dark:border-red-800/50",
    textColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-500", 
    label: "Error"
  },
  warning: {
    color: "yellow",
    icon: AlertTriangle,
    bgColor: "bg-yellow-50/50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200/50 dark:border-yellow-800/50",
    textColor: "text-yellow-600 dark:text-yellow-500",
    dotColor: "bg-yellow-500",
    label: "Warning"
  },
  success: {
    color: "emerald",
    icon: Zap,
    bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
    borderColor: "border-emerald-200/50 dark:border-emerald-800/50",
    textColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
    label: "Success"
  }
}

const sizeConfig = {
  sm: {
    container: "p-3",
    dot: "size-2",
    icon: "size-4",
    title: "text-sm",
    description: "text-xs"
  },
  md: {
    container: "p-4",
    dot: "size-3", 
    icon: "size-5",
    title: "text-base",
    description: "text-sm"
  },
  lg: {
    container: "p-6",
    dot: "size-4",
    icon: "size-6", 
    title: "text-lg",
    description: "text-base"
  },
  xl: {
    container: "p-8",
    dot: "size-5",
    icon: "size-8",
    title: "text-xl", 
    description: "text-lg"
  }
}

const pulseVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      ease: "easeInOut" as const,
      repeat: Infinity
    }
  }
}

const ringVariants = {
  pulse: {
    scale: [1, 2, 1],
    opacity: [0.7, 0, 0.7],
    transition: {
      duration: 2,
      ease: "easeInOut" as const, 
      repeat: Infinity
    }
  }
}

const spinVariants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear" as const,
      repeat: Infinity
    }
  }
}

export function StatusIndicator({ 
  status, 
  size = "md", 
  variant = "detailed",
  label,
  description,
  showPulse = true,
  className 
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const sizeStyles = sizeConfig[size]
  const IconComponent = config.icon

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative">
          <motion.div
            className={cn(sizeStyles.dot, config.dotColor, "rounded-full")}
            variants={showPulse ? pulseVariants : undefined}
            animate={showPulse ? "pulse" : undefined}
          />
          {showPulse && (
            <motion.div
              className={cn(
                "absolute inset-0 rounded-full",
                config.dotColor,
                "opacity-75"
              )}
              variants={ringVariants}
              animate="pulse"
            />
          )}
        </div>
        <span className={cn(sizeStyles.title, config.textColor, "font-medium")}>
          {label || config.label}
        </span>
      </div>
    )
  }

  if (variant === "premium") {
    return (
      <div className={cn(
        "glass-enhanced rounded-2xl overflow-hidden relative",
        config.bgColor,
        config.borderColor,
        sizeStyles.container,
        "hover-lift",
        className
      )}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className={cn(
                "p-2 rounded-xl shadow-lg",
                `bg-${config.color}-500/20`,
                `border border-${config.color}-400/30`
              )}>
                <IconComponent 
                  className={cn(sizeStyles.icon, config.textColor)}
                  {...(status === "loading" && {
                    as: motion.div,
                    variants: spinVariants,
                    animate: "spin"
                  } as any)}
                />
              </div>
              
              {showPulse && (
                <motion.div
                  className={cn(
                    "absolute -top-1 -right-1 size-3 rounded-full",
                    config.dotColor
                  )}
                  variants={pulseVariants}
                  animate="pulse"
                />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                sizeStyles.title, 
                config.textColor,
                "font-semibold leading-tight"
              )}>
                {label || config.label}
              </h3>
              {description && (
                <p className={cn(
                  sizeStyles.description,
                  "text-muted-foreground mt-1 leading-relaxed"
                )}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
      </div>
    )
  }

  // Default detailed variant
  return (
    <div className={cn(
      "glass rounded-2xl overflow-hidden",
      config.bgColor,
      config.borderColor,
      sizeStyles.container,
      "hover:shadow-lg transition-all duration-300",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <motion.div
            className={cn(sizeStyles.dot, config.dotColor, "rounded-full")}
            variants={showPulse ? pulseVariants : undefined}
            animate={showPulse ? "pulse" : undefined}
          />
          {showPulse && (
            <motion.div
              className={cn(
                "absolute inset-0 rounded-full",
                config.dotColor,
                "opacity-75"
              )}
              variants={ringVariants}
              animate="pulse"
            />
          )}
        </div>
        
        <IconComponent 
          className={cn(sizeStyles.icon, config.textColor)}
          {...(status === "loading" && {
            as: motion.div,
            variants: spinVariants,
            animate: "spin"
          } as any)}
        />
        
        <div className="flex-1 min-w-0">
          <h4 className={cn(sizeStyles.title, config.textColor, "font-semibold leading-none")}>
            {label || config.label}
          </h4>
          {description && (
            <p className={cn(sizeStyles.description, "text-muted-foreground mt-1 leading-tight")}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { Loader2 } from "lucide-react"

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "glass" | "gradient" | "premium"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  gradient?: "blue" | "purple" | "emerald" | "amber" | "rose" | "rainbow"
  glow?: boolean
  pulse?: boolean
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" as const }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" as const }
  }
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

const pulseVariants = {
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
      ease: "easeInOut" as const,
      repeat: Infinity
    }
  }
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ 
    className,
    variant = "default",
    size = "md", 
    loading = false,
    disabled,
    children,
    icon,
    iconPosition = "left",
    gradient = "blue",
    glow = false,
    pulse = false,
    ...props 
  }, ref) => {
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      glass: "glass text-foreground hover:bg-white/20 dark:hover:bg-white/10 shadow-lg hover:shadow-xl border-white/20",
      gradient: `btn-gradient text-white shadow-lg hover:shadow-xl`,
      premium: "glass-enhanced bg-gradient-to-r from-white/20 to-white/10 text-foreground hover:from-white/30 hover:to-white/20 shadow-xl hover:shadow-2xl border-white/30"
    }

    const sizeClasses = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2", 
      lg: "h-12 px-6 text-base gap-2.5",
      xl: "h-14 px-8 text-lg gap-3"
    }

    const gradientClasses = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      emerald: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
      amber: "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
      rose: "from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700",
      rainbow: "from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
    }

    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
          variantClasses[variant],
          sizeClasses[size],
          variant === "gradient" && `bg-gradient-to-r ${gradientClasses[gradient]}`,
          variant === "premium" && "backdrop-blur-[20px]",
          glow && "hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
          className
        )}
        variants={buttonVariants}
        initial="initial"
        whileHover={!isDisabled ? "hover" : undefined}
        whileTap={!isDisabled ? "tap" : undefined}
        animate={pulse && !isDisabled ? pulseVariants.pulse : undefined}
        disabled={isDisabled}
        {...(props as any)}
      >
        {/* Glow effect background */}
        {glow && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-xl blur-xl -z-10"
            variants={glowVariants}
            initial="initial"
            whileHover={!isDisabled ? "hover" : undefined}
          />
        )}

        {/* Shine effect */}
        {(variant === "glass" || variant === "premium") && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        )}

        {/* Content */}
        <div className="flex items-center gap-2 relative z-10">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              {icon && iconPosition === "left" && (
                <span className="flex items-center">
                  {icon}
                </span>
              )}
              {children}
              {icon && iconPosition === "right" && (
                <span className="flex items-center">
                  {icon}
                </span>
              )}
            </>
          )}
        </div>

        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 pointer-events-none" />
      </motion.button>
    )
  }
)

ActionButton.displayName = "ActionButton"

export { ActionButton }
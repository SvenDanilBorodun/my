import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "enhanced" | "premium" | "minimal"
  hover?: "lift" | "glow" | "scale" | "none"
  gradient?: "blue" | "purple" | "emerald" | "amber" | "rose" | "none"
  blur?: "light" | "medium" | "heavy"
  border?: "subtle" | "visible" | "glow" | "animated"
}

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

const glowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    variant = "default", 
    hover = "lift", 
    gradient = "none",
    blur = "medium",
    border = "subtle",
    children, 
    ...props 
  }, ref) => {
    const variantClasses = {
      default: "bg-white/5 dark:bg-white/5",
      enhanced: "bg-white/10 dark:bg-black/20",
      premium: "bg-gradient-to-br from-white/15 to-white/5 dark:from-white/10 dark:to-black/20",
      minimal: "bg-white/3 dark:bg-white/3"
    }

    const blurClasses = {
      light: "backdrop-blur-[10px]",
      medium: "backdrop-blur-[20px]", 
      heavy: "backdrop-blur-[30px]"
    }

    const borderClasses = {
      subtle: "border border-white/10 dark:border-white/10",
      visible: "border border-white/20 dark:border-white/20",
      glow: "border border-white/20 dark:border-white/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
      animated: "border border-white/20 dark:border-white/20 border-gradient-animated"
    }

    const gradientClasses = {
      blue: "bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10",
      purple: "bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-950/20 dark:to-purple-900/10",
      emerald: "bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/20 dark:to-emerald-900/10",
      amber: "bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-950/20 dark:to-amber-900/10",
      rose: "bg-gradient-to-br from-rose-50/50 to-rose-100/30 dark:from-rose-950/20 dark:to-rose-900/10",
      none: ""
    }

    const hoverClasses = {
      lift: "hover-lift",
      glow: "hover-glow", 
      scale: "hover:scale-[1.02] transition-transform duration-300",
      none: ""
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-3xl overflow-hidden",
          variantClasses[variant],
          gradientClasses[gradient],
          blurClasses[blur],
          borderClasses[border],
          hoverClasses[hover],
          "shadow-xl hover:shadow-2xl transition-all duration-500",
          "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] before:hover:translate-x-[100%] before:transition-transform before:duration-1000",
          className
        )}
        variants={hover === "lift" ? cardVariants : undefined}
        initial="initial"
        animate="animate"
        whileHover={hover === "lift" ? "hover" : undefined}
        {...(props as any)}
      >
        {/* Glow effect for premium variant */}
        {hover === "glow" && (
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-[2rem] -z-10 blur-xl"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
      </motion.div>
    )
  }
)

GlassCard.displayName = "GlassCard"

export { GlassCard }
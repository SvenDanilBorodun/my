"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Home, Play, Dumbbell, BrainCircuit, FolderOpen, Settings } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

interface TabItem {
  icon: React.ReactNode
  label: string
  href: string
  description: string
  color: {
    primary: string
    secondary: string
    hover: string
    glow: string
  }
}

interface EnhancedMenuBarProps {
  className?: string
}

const tabItems: TabItem[] = [
  {
    icon: <Home className="h-4 w-4" />,
    label: "Dashboard",
    href: "/",
    description: "Overview and status",
    color: {
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-blue-700 dark:text-blue-300",
      hover: "text-blue-500 dark:text-blue-200",
      glow: "bg-blue-400/20"
    }
  },
  {
    icon: <Play className="h-4 w-4" />,
    label: "Control",
    href: "/control",
    description: "Robot control center",
    color: {
      primary: "text-green-600 dark:text-green-400",
      secondary: "text-green-700 dark:text-green-300",
      hover: "text-green-500 dark:text-green-200",
      glow: "bg-green-400/20"
    }
  },
  {
    icon: <Dumbbell className="h-4 w-4" />,
    label: "AI Training",
    href: "/train",
    description: "Train AI models",
    color: {
      primary: "text-purple-600 dark:text-purple-400",
      secondary: "text-purple-700 dark:text-purple-300",
      hover: "text-purple-500 dark:text-purple-200",
      glow: "bg-purple-400/20"
    }
  },
  {
    icon: <BrainCircuit className="h-4 w-4" />,
    label: "AI Control",
    href: "/inference",
    description: "AI-powered control",
    color: {
      primary: "text-cyan-600 dark:text-cyan-400",
      secondary: "text-cyan-700 dark:text-cyan-300",
      hover: "text-cyan-500 dark:text-cyan-200",
      glow: "bg-cyan-400/20"
    }
  },
  {
    icon: <FolderOpen className="h-4 w-4" />,
    label: "Browse",
    href: "/browse",
    description: "Dataset management",
    color: {
      primary: "text-amber-600 dark:text-amber-400",
      secondary: "text-amber-700 dark:text-amber-300",
      hover: "text-amber-500 dark:text-amber-200",
      glow: "bg-amber-400/20"
    }
  },
  {
    icon: <Settings className="h-4 w-4" />,
    label: "Settings",
    href: "/admin",
    description: "Configuration",
    color: {
      primary: "text-gray-600 dark:text-gray-400",
      secondary: "text-gray-700 dark:text-gray-300",
      hover: "text-gray-500 dark:text-gray-200",
      glow: "bg-gray-400/20"
    }
  },
]


export function EnhancedMenuBar({ className }: EnhancedMenuBarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = React.useState({})
  const [activeStyle, setActiveStyle] = React.useState({ left: "0px", width: "0px" })
  const tabRefs = React.useRef<(HTMLDivElement | null)[]>([])

  // Find active tab index
  const activeIndex = tabItems.findIndex(tab => {
    if (tab.href === "/") {
      return currentPath === "/"
    }
    if (tab.href === "/browse") {
      return currentPath.startsWith("/browse")
    }
    return currentPath === tab.href
  })

  // Update hover style
  React.useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  // Update active style
  React.useEffect(() => {
    if (activeIndex !== -1) {
      const activeElement = tabRefs.current[activeIndex]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [activeIndex, currentPath])

  // Initial active style setup
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (activeIndex !== -1) {
        const activeElement = tabRefs.current[activeIndex]
        if (activeElement) {
          const { offsetLeft, offsetWidth } = activeElement
          setActiveStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          })
        }
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [activeIndex])

  const handleTabClick = (href: string) => {
    navigate(href)
  }

  return (
    <motion.div
      className={cn(
        "relative glass-enhanced backdrop-blur-[25px] bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-visible",
        className
      )}
      initial={{ y: -20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Liquid glass gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-cyan-500/5 pointer-events-none" />
      
      <div className="relative p-2">
        {/* Active background indicator */}
        <motion.div
          className="absolute inset-y-2 bg-gradient-to-r from-blue-500/30 via-purple-500/25 to-cyan-500/30 rounded-xl backdrop-blur-sm border border-blue-400/30 shadow-lg shadow-blue-500/20"
          style={activeStyle}
          animate={{ 
            opacity: activeIndex !== -1 ? 1 : 0,
            scale: activeIndex !== -1 ? 1 : 0.8
          }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut",
            scale: { type: "spring", stiffness: 300, damping: 25 }
          }}
        />

        {/* Hover background indicator */}
        <motion.div
          className="absolute inset-y-2 bg-gradient-to-r from-white/10 via-blue-500/10 to-white/10 rounded-xl backdrop-blur-sm border border-white/20"
          style={{
            ...hoverStyle,
            opacity: hoveredIndex !== null && hoveredIndex !== activeIndex ? 1 : 0,
          }}
          animate={{ 
            opacity: hoveredIndex !== null && hoveredIndex !== activeIndex ? 1 : 0,
            scale: hoveredIndex !== null && hoveredIndex !== activeIndex ? 1 : 0.95
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />

        {/* Tabs */}
        <div className="relative flex items-center gap-2 justify-center min-w-max px-2">
          {tabItems.map((tab, index) => (
            <motion.div
              key={tab.href}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              className={cn(
                "relative px-4 py-3 cursor-pointer h-[44px] rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 min-w-fit",
                index === activeIndex
                  ? `${tab.color.secondary} font-semibold drop-shadow-sm`
                  : `text-slate-600 dark:text-slate-300 hover:${tab.color.hover}`
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleTabClick(tab.href)}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* Icon container with enhanced animations */}
              <motion.div
                className={cn(
                  "relative flex items-center justify-center w-5 h-5 transition-colors duration-300",
                  index === activeIndex
                    ? tab.color.primary
                    : `text-slate-500 dark:text-slate-400 group-hover:${tab.color.primary}`
                )}
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.2
                }}
                transition={{ 
                  rotate: { duration: 0.6, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                {tab.icon}
                
                {/* Active glow effect */}
                {index === activeIndex && (
                  <motion.div
                    className={`absolute inset-0 ${tab.color.glow} rounded-full blur-sm`}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>

              {/* Label with enhanced styling */}
              <motion.span 
                className={cn(
                  "text-sm whitespace-nowrap font-medium transition-all duration-300",
                  index === activeIndex 
                    ? `${tab.color.secondary} drop-shadow-sm` 
                    : `text-slate-600 dark:text-slate-300 group-hover:${tab.color.hover}`
                )}
                whileHover={{ letterSpacing: "0.02em" }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </motion.span>

              {/* Active indicator line */}
              {index === activeIndex && (
                <motion.div
                  className="absolute bottom-1 left-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  initial={{ scaleX: 0, x: "-50%" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
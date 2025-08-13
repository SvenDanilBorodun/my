import { cn } from "@/lib/utils";
import * as React from "react";

// Base skeleton component with enhanced styling
function Skeleton({ 
  className, 
  variant = "default",
  ...props 
}: React.ComponentProps<"div"> & {
  variant?: "default" | "glass" | "shimmer" | "pulse";
}) {
  const baseClasses = "rounded-md";
  
  const variantClasses = {
    default: "bg-accent animate-pulse",
    glass: "glass animate-pulse bg-blue-50/30 dark:bg-blue-900/10 border border-blue-200/20",
    shimmer: "bg-gradient-to-r from-accent via-accent/60 to-accent bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]",
    pulse: "bg-blue-100/50 dark:bg-blue-800/20 animate-pulse border border-blue-200/30"
  };

  return (
    <div
      data-slot="skeleton"
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

// Card skeleton for dashboard cards
function CardSkeleton({ 
  variant = "default",
  showHeader = true,
  showContent = true,
  showFooter = false,
  className,
  ...props
}: {
  variant?: "default" | "glass" | "compact";
  showHeader?: boolean;
  showContent?: boolean;
  showFooter?: boolean;
  className?: string;
}) {
  if (variant === "glass") {
    return (
      <div className={cn("glass rounded-xl p-6 space-y-4 hover-lift", className)} {...props}>
        {showHeader && (
          <div className="space-y-3">
            <Skeleton variant="glass" className="h-6 w-3/4" />
            <Skeleton variant="glass" className="h-4 w-1/2" />
          </div>
        )}
        {showContent && (
          <div className="space-y-2">
            <Skeleton variant="glass" className="h-4 w-full" />
            <Skeleton variant="glass" className="h-4 w-4/5" />
            <Skeleton variant="glass" className="h-4 w-3/5" />
          </div>
        )}
        {showFooter && (
          <div className="flex items-center space-x-2 pt-2">
            <Skeleton variant="glass" className="h-8 w-20" />
            <Skeleton variant="glass" className="h-8 w-16" />
          </div>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("border rounded-lg p-4 space-y-3", className)} {...props}>
        {showHeader && (
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        )}
        {showContent && (
          <Skeleton className="h-20 w-full" />
        )}
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className={cn("border rounded-xl p-6 space-y-4", className)} {...props}>
      {showHeader && (
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
      {showContent && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      )}
      {showFooter && (
        <div className="flex items-center space-x-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      )}
    </div>
  );
}

// List skeleton for data tables
function ListSkeleton({ 
  items = 5,
  showAvatar = false,
  showActions = true,
  variant = "default",
  className,
  ...props
}: {
  items?: number;
  showAvatar?: boolean;
  showActions?: boolean;
  variant?: "default" | "compact" | "detailed";
  className?: string;
}) {
  const renderItem = (index: number) => {
    if (variant === "compact") {
      return (
        <div key={index} className="flex items-center space-x-3 py-2">
          {showAvatar && <Skeleton className="h-8 w-8 rounded-full" />}
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          {showActions && <Skeleton className="h-6 w-16 rounded" />}
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-start space-x-3">
            {showAvatar && <Skeleton className="h-12 w-12 rounded-full" />}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-1/3" />
                {showActions && (
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                )}
              </div>
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div key={index} className="flex items-center space-x-4 py-3">
        {showAvatar && <Skeleton className="h-10 w-10 rounded-full" />}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        {showActions && (
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("space-y-1", className)} {...props}>
      {Array.from({ length: items }).map((_, index) => renderItem(index))}
    </div>
  );
}

// Status indicator skeleton
function StatusSkeleton({ 
  variant = "default",
  size = "default",
  className,
  ...props
}: {
  variant?: "default" | "dot" | "badge" | "card";
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-6 w-6"
  };

  if (variant === "dot") {
    return (
      <div className={cn("flex items-center space-x-2", className)} {...props}>
        <Skeleton className={cn("rounded-full", sizeClasses[size])} />
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <Skeleton 
        className={cn("h-6 w-20 rounded-full", className)} 
        {...props}
      />
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("glass rounded-lg p-4 space-y-2", className)} {...props}>
        <div className="flex items-center space-x-2">
          <Skeleton variant="glass" className="h-4 w-4 rounded-full" />
          <Skeleton variant="glass" className="h-4 w-24" />
        </div>
        <Skeleton variant="glass" className="h-8 w-full" />
      </div>
    );
  }

  return (
    <Skeleton 
      className={cn("rounded-full", sizeClasses[size], className)} 
      {...props}
    />
  );
}

// Button skeleton
function ButtonSkeleton({ 
  variant = "default",
  size = "default",
  className,
  ...props
}: {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-8 w-16",
    default: "h-9 w-20",
    lg: "h-10 w-24",
    icon: "h-9 w-9"
  };

  const variantClasses = {
    default: "bg-accent",
    outline: "border bg-background",
    ghost: "bg-accent/50"
  };

  return (
    <Skeleton 
      className={cn(
        "animate-pulse rounded-md",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

// Table skeleton
function TableSkeleton({ 
  rows = 5,
  columns = 4,
  showHeader = true,
  className,
  ...props
}: {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Table header */}
      {showHeader && (
        <div className="grid grid-cols-4 gap-4 p-4 border-b">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      )}
      
      {/* Table rows */}
      <div className="space-y-0">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4 border-b border-border/50">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { 
  Skeleton, 
  CardSkeleton, 
  ListSkeleton, 
  StatusSkeleton, 
  ButtonSkeleton, 
  TableSkeleton 
};

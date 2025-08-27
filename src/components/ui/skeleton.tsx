// src/components/ui/skeleton.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual shape of the skeleton
   * - block: rounded rectangle (default)
   * - circle: perfect circle (use equal height/width)
   * - text: text-like line (slightly rounded)
   */
  variant?: "block" | "circle" | "text";
}

const variantClasses: Record<NonNullable<SkeletonProps["variant"]>, string> = {
  block: "rounded-md",
  circle: "rounded-full",
  text: "rounded",
};

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "block", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // animation + accessible base colors for both themes
          "animate-pulse bg-gray-200 dark:bg-gray-700",
          // shape
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };

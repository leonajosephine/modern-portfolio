import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full border transition-all duration-200",
    "font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground border-primary",
          "hover:-translate-y-0.5 hover:opacity-95",
        ],
        secondary: [
          "bg-transparent text-foreground border-border",
          "hover:-translate-y-0.5 hover:bg-white/5",
        ],
        ghost: [
          "bg-transparent text-foreground border-transparent",
          "hover:bg-white/5",
        ],
      },
      size: {
        sm: "min-h-10 px-4 text-sm",
        md: "min-h-12 px-5 text-sm sm:text-base",
        lg: "min-h-14 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
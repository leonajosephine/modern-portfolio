import * as React from "react";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "portfolio-button",
    "relative isolate overflow-hidden",
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "border font-medium",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "portfolio-button--primary",
          "border-primary bg-primary text-primary-foreground",
        ],

        secondary: [
          "portfolio-button--secondary",
          "border-border bg-transparent text-foreground",
        ],

        ghost: [
          "portfolio-button--ghost",
          "border-transparent bg-transparent text-foreground",
        ],

        accent: [
          "portfolio-button--accent",
          "border-secondary bg-secondary text-secondary-foreground",
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
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
}
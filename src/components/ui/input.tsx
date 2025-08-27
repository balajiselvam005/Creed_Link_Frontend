import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const inputVariants = cva(
  "flex rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-blue-500", // base styles
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900 border-gray-300 focus:ring-blue-500",
        profileUpdate:
          "bg-gray-100 text-gray-800 border-gray-300 focus:ring-blue-500",
        error:
          "bg-white text-gray-900 border-red-300 focus:ring-red-500 focus:border-red-500",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, label, error, ...props }, ref) => {
    // Use error variant if error exists, otherwise use provided variant
    const finalVariant = error ? "error" : variant;

    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({ variant: finalVariant, inputSize }),
            className
          )}
          {...props}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };

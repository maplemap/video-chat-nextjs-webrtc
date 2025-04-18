import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap text-sm font-medium 
  transition-colors focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none 
  disabled:opacity-50 duration-200`,
  {
    variants: {
      variant: {
        default:
          'bg-white text-black border border-gray-600 dark:bg-blue-950 dark:text-white hover:border-gray-900 h-[40px]',
        ghost: 'text-black border border-transparent dark:bg-blue-950',
        link: 'text-black underline-offset-4 hover:underline dark:text-white',
      },
      size: {
        default: 'px-4 py-2 text-md',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8 text-lg',
        icon: 'w-10 h-10 md:w-12 md:h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

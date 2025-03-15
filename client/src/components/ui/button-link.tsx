import * as React from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<ButtonProps, "asChild"> {
  href: string;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "default", size = "default", href, ...props }, ref) => {
    return (
      <Link href={href}>
        <a
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </Link>
    );
  }
);
ButtonLink.displayName = "ButtonLink";

export { ButtonLink };

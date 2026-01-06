import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "md", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      sizeClasses[size],
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarWithBadgeProps extends AvatarProps {
  src: string;
  alt: string;
  fallback?: string;
  isVerified?: boolean;
  isOnline?: boolean;
}

const AvatarWithBadge = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarWithBadgeProps
>(({ src, alt, fallback, isVerified, isOnline, size = "md", className, ...props }, ref) => (
  <div className="relative inline-block">
    <Avatar ref={ref} size={size} className={className} {...props}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback || alt.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
    {isVerified && (
      <CheckCircle className="absolute -right-0.5 -bottom-0.5 h-4 w-4 text-primary fill-primary-foreground" />
    )}
    {isOnline && (
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
    )}
  </div>
));
AvatarWithBadge.displayName = "AvatarWithBadge";

export { Avatar, AvatarImage, AvatarFallback, AvatarWithBadge };

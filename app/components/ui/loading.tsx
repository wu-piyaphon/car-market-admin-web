import { cn } from "~/lib/utils";

// ----------------------------------------------------------------------

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "animate-spin-smooth border-muted border-t-primary rounded-full border-2",
        sizeClasses[size],
        className
      )}
    />
  );
}

// ----------------------------------------------------------------------

type LoadingDotsProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

function LoadingDots({ size = "md", className }: LoadingDotsProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map(index => (
        <div
          key={index}
          className={cn(
            "bg-primary animate-bounce-dot rounded-full",
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------

type LoadingPulseProps = {
  className?: string;
};

function LoadingPulse({ className }: LoadingPulseProps) {
  return (
    <div className={cn("flex space-x-2", className)}>
      {[0, 1, 2].map(index => (
        <div
          key={index}
          className="bg-primary animate-pulse-fade h-8 w-3 rounded-full"
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------

type LoadingLayoutProps = {
  variant?: "spinner" | "dots" | "pulse";
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
  className?: string;
};

function LoadingLayout({
  variant = "spinner",
  size = "lg",
  text = "Loading...",
  fullScreen = false,
  className,
}: LoadingLayoutProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    : "w-full";

  const contentClasses = fullScreen
    ? "flex h-screen items-center justify-center"
    : "flex items-center justify-center p-8";

  const renderLoadingIcon = () => {
    switch (variant) {
      case "dots":
        return <LoadingDots size={size === "xl" ? "lg" : size} />;
      case "pulse":
        return <LoadingPulse />;
      default:
        return <LoadingSpinner size={size} />;
    }
  };

  return (
    <div className={cn(containerClasses, className)}>
      <div className={contentClasses}>
        <div className="animate-scale-in flex flex-col items-center space-y-4">
          <div className="relative">{renderLoadingIcon()}</div>
          {text && (
            <p className="text-muted-foreground animate-pulse-fade text-sm font-medium">
              {text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

type LoadingOverlayProps = {
  visible: boolean;
  variant?: "spinner" | "dots" | "pulse";
  text?: string;
  className?: string;
};

function LoadingOverlay({
  visible,
  variant = "spinner",
  text = "Loading...",
  className,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        "transition-opacity duration-200",
        className
      )}
    >
      <LoadingLayout variant={variant} text={text} />
    </div>
  );
}

// ----------------------------------------------------------------------

export {
  LoadingDots,
  LoadingLayout,
  LoadingOverlay,
  LoadingPulse,
  LoadingSpinner,
};

import { cn } from '../../../../lib/util';


type BadgeVariant = 'default' | 'secondary' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  className,
}: BadgeProps) => {
  const variantStyles = {
    default: 'bg-primary text-primary-foreground border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border-secondary/20',
    outline: 'bg-white/5 text-muted-foreground border-white/10',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

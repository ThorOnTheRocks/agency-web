import { cn } from '../../../lib/util';

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6',
        'hover:border-white/20 hover:bg-white/10 transition-colors duration-300',
        'before:absolute before:inset-0 before:-z-10 before:translate-x-[50%] before:translate-y-[50%] before:bg-gradient-to-br before:from-indigo-500/10 before:to-purple-500/10 before:blur-3xl',
        className
      )}
    >
      {children}
    </div>
  );
};

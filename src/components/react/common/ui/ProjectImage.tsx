import { cn } from '../../../../lib/util';

export const ProjectImage = ({
  src,
  alt,
  placeholderLabel = 'Visual in preparation',
  className,
}: {
  src?: string;
  alt: string;
  placeholderLabel?: string;
  className?: string;
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden border border-border/70 bg-surface',
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:28px_28px] opacity-40"></div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/90 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent"></div>
      <div className="rounded-full border border-border/80 bg-background/88 px-4 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm">
        {placeholderLabel}
      </div>
    </div>
  );
};

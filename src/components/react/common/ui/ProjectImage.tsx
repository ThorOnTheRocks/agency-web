import { cn } from '../../../../lib/util';

export const ProjectImage = ({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
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
        'w-full h-full flex items-center justify-center bg-neutral-900 border-b border-white/5 relative overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest border border-neutral-800 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
        No Asset
      </div>
    </div>
  );
};

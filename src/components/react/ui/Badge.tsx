export const Badge = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/5 text-muted-foreground border border-white/10">
    {children}
  </span>
);

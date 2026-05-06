interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-mono text-text-muted border border-border rounded-sm ${className}`}>
      {children}
    </span>
  );
}

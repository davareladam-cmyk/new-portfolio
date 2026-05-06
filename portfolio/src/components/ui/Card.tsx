interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-surface border border-border p-6 relative overflow-hidden card-hover ${className}`}>
      {children}
    </div>
  );
}

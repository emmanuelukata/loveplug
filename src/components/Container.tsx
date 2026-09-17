export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)] ${className}`}
    >
      {children}
    </div>
  );
}

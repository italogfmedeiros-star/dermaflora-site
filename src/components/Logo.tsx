export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="var(--df-primary-100)" />
      <path
        d="M20 30c-6.5-3.4-9-8-9-12.4C11 12 15 8 20 8s9 4 9 9.6c0 4.4-2.5 9-9 12.4Z"
        fill="none"
        stroke="var(--df-primary-700)"
        strokeWidth="1.6"
      />
      <path
        d="M20 30V13.5"
        stroke="var(--df-primary-700)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 20c2.8-3 6-3.8 8-3.6"
        stroke="var(--df-primary-700)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function LogoMark({ withWordmark = true }: { withWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo className="h-9 w-9 shrink-0" />
      {withWordmark && (
        <span className="font-display text-[1.15rem] font-bold tracking-tight text-df-ink-900">
          Dermaflora
        </span>
      )}
    </div>
  );
}

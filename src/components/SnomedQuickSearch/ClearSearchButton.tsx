type ClearSearchButtonProps = Readonly<{
  onClick: () => void;
}>;

export function ClearSearchButton({ onClick }: ClearSearchButtonProps) {
  return (
    <button
      type="button"
      aria-label="Clear search term"
      onClick={onClick}
      className="absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-100 md:h-6 md:w-6"
    >
      <svg
        aria-hidden="true"
        className="h-4 w-4 md:h-3.5 md:w-3.5"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5 5L15 15M15 5L5 15"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}

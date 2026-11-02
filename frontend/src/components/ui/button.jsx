export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={
        "px-6 py-3 min-w-[150px] rounded-lg font-medium bg-emerald-600 text-white " +
        "hover:bg-emerald-700 transition shadow-lg whitespace-nowrap " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}


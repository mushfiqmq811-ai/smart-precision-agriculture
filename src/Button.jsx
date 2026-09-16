function Button({ children, variant="primary", className="", ...props }) {
  const variants = {
    primary: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
    secondary: "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800",
    ghost: "text-slate-300 hover:bg-slate-800 hover:text-white",
  };
  return <button className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`} {...props}>{children}</button>;
}
export default Button;

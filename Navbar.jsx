import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "AI Lab", path: "/ai-lab" },
  { label: "Architecture", path: "/architecture" },
  { label: "Impact & Cost", path: "/impact-and-cost" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-xl shadow-lg shadow-emerald-950/20">
            🌱
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white sm:text-base">
              Smart Agriculture
            </p>
            <p className="hidden text-xs text-slate-400 sm:block">
              Precision Farming Platform
            </p>
          </div>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/dashboard"
          className="shrink-0 rounded-xl bg-emerald-500 px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-400 active:scale-95 sm:px-4 sm:text-sm"
        >
          <span className="hidden sm:inline">Live Dashboard</span>
          <span className="sm:hidden">Dashboard</span>
        </NavLink>
      </nav>

      <div className="border-t border-slate-800/70 md:hidden">
        <div className="flex gap-1 overflow-x-auto px-4 py-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-400 hover:bg-slate-800",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
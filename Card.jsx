function Card({ children, className="" }) {
  return <section className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10 ${className}`}>{children}</section>;
}
export default Card;
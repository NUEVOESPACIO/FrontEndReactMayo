export default function Header() {
  return (
    <header className="shrink-0 border-b border-slate-200 bg-slate-900 px-6 py-4 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Gravity</h1>
          <p className="text-sm text-slate-300">Principal application layout</p>
        </div>
        <span className="hidden rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 sm:inline">
          Fixed header
        </span>
      </div>
    </header>
  );
}

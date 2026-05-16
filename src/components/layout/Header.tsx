export default function Header() {
  return (
    <header className="shrink-0 border-b border-indigo-800/50 bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-900 px-6 py-5 text-white shadow-lg">
      <div className="flex items-center justify-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Gravity
          </h1>
          <p className="mt-1 text-base text-indigo-200 sm:text-lg">
            Principal application layout
          </p>
        </div>
      </div>
    </header>
  );
}

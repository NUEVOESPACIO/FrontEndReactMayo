import { useAuth } from "../../hooks/useAuths";

function SessionInactiveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="17" y1="8" x2="22" y2="13" />
      <line x1="22" y1="8" x2="17" y2="13" />
    </svg>
  );
}

function SessionActiveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m18.5 9.5 1.5 1.5 3-3" />
      <circle cx="19" cy="10" r="5" />
    </svg>
  );
}

export default function Header() {
  const { token, user } = useAuth();
  const isLoggedIn = Boolean(token);
  const displayName = user?.username ?? user?.name;

  return (
    <header className="shrink-0 border-b border-indigo-800/50 bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-900 px-6 py-5 text-white shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Gravity
          </h1>
          <p className="mt-1 text-base text-indigo-200 sm:text-lg">
            Principal application layout
          </p>
        </div>

        <div
          className={`flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-2.5 ${
            isLoggedIn
              ? "border-emerald-400/40 bg-emerald-500/10"
              : "border-indigo-400/30 bg-indigo-950/40"
          }`}
          role="status"
          aria-live="polite"
          aria-label={
            isLoggedIn && displayName
              ? `Sesión activa por ${displayName}`
              : "Sin sesión"
          }
        >
          {isLoggedIn ? (
            <>
              <SessionActiveIcon className="h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-sm font-medium text-emerald-50 sm:text-base">
                Sesión activa por{" "}
                <span className="font-semibold text-white">
                  {displayName ?? "usuario"}
                </span>
              </p>
            </>
          ) : (
            <>
              <SessionInactiveIcon className="h-5 w-5 shrink-0 text-indigo-300" />
              <p className="text-sm font-medium text-indigo-200 sm:text-base">
                Sin sesión
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

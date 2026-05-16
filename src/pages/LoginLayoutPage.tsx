import { Link } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";

export default function LoginLayoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="shrink-0 border-b border-indigo-800/50 bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-900 px-6 py-5 text-white shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Gravity
            </h1>
            <p className="mt-1 text-base text-indigo-200 sm:text-lg">
              Iniciar sesión
            </p>
          </div>
          <Link
            to="/"
            className="rounded-lg border border-indigo-300/40 px-4 py-2 text-sm font-semibold text-indigo-100 transition-colors hover:bg-white/10"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <LoginForm />
      </main>
    </div>
  );
}

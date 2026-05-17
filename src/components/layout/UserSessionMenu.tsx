import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuths";
import type { MenuTopicId } from "../../types/menuTypes";

function UserIcon({ className }: { className?: string }) {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface UserSessionMenuProps {
  onSelectMenu: (id: MenuTopicId) => void;
  onAfterLogout: () => void;
}

export default function UserSessionMenu({
  onSelectMenu,
  onAfterLogout,
}: UserSessionMenuProps) {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = Boolean(token);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleAction = () => {
    setOpen(false);

    if (isLoggedIn) {
      logout();
      onAfterLogout();
      return;
    }

    navigate("/");
    onSelectMenu("Bienvenida");
  };

  return (
    <div
      ref={menuRef}
      className="relative shrink-0"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={
          isLoggedIn
            ? "Sesión iniciada. Abrir menú de cuenta"
            : "Sin sesión. Abrir menú de cuenta"
        }
        className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-indigo-200/90 bg-white text-indigo-800 shadow-sm transition-colors hover:bg-indigo-50 hover:text-violet-800"
      >
        <UserIcon className="h-6 w-6" />
        <span
          className={`absolute right-1 top-1 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
            isLoggedIn ? "bg-emerald-500" : "bg-slate-400"
          }`}
          title={isLoggedIn ? "Sesión activa" : "Sin sesión"}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[12rem] overflow-hidden rounded-lg border border-indigo-200/90 bg-white py-1 shadow-lg"
        >
          <div className="border-b border-indigo-100 px-4 py-2.5">
            <p className="text-xs font-medium uppercase tracking-wide text-indigo-500">
              Estado
            </p>
            <p className="mt-0.5 text-sm font-semibold text-indigo-950">
              {isLoggedIn ? "Sesión iniciada" : "Sin sesión"}
            </p>
            {isLoggedIn && user?.username && (
              <p className="mt-0.5 truncate text-xs text-indigo-600">
                {user.username}
              </p>
            )}
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={handleAction}
            className="w-full px-4 py-2.5 text-left text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-50 hover:text-violet-800"
          >
            {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
          </button>
        </div>
      )}
    </div>
  );
}

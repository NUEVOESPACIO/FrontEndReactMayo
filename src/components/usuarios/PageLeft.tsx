import { useEffect, useState } from "react";
import { fetchUsers } from "../../api/usersApi";
import { useAuth } from "../../hooks/useAuths";
import { getRoleLabel } from "../../types/roles";
import type { User } from "../../types/authTypes";

interface PageLeftProps {
  selectedId: number | null;
  onSelectId: (id: number) => void;
}

export default function PageLeft({ selectedId, onSelectId }: PageLeftProps) {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setUsuarios([]);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUsers();
        if (!cancelled) {
          setUsuarios(data);
        }
      } catch {
        if (!cancelled) {
          setUsuarios([]);
          setError("No se pudo cargar la lista de usuarios.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!token) {
    return (
      <p className="text-slate-600">
        Inicia sesión para ver la lista de usuarios.
      </p>
    );
  }

  if (loading) {
    return <p className="text-slate-600">Cargando usuarios…</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (usuarios.length === 0) {
    return <p className="text-slate-600">No hay usuarios para mostrar.</p>;
  }

  return (
    <div className="space-y-2">
      <p className="mb-3 text-sm font-medium text-slate-700">Lista de usuarios</p>
      {usuarios.map((usuario) => {
        const isSelected = usuario.id === selectedId;
        const roleLabel = getRoleLabel(usuario.rol);
        const displayName = usuario.username ?? `Usuario ${usuario.id}`;

        return (
          <button
            key={usuario.id}
            type="button"
            onClick={() => onSelectId(usuario.id)}
            className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
              isSelected
                ? "border-indigo-300 bg-indigo-50 ring-2 ring-indigo-200"
                : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
            }`}
          >
            <p className="font-medium text-slate-900">{displayName}</p>
            <p className="mt-0.5 text-sm text-slate-600">{roleLabel}</p>
          </button>
        );
      })}
    </div>
  );
}

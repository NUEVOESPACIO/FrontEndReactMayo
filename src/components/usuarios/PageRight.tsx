import { useEffect, useState } from "react";
import { listadousuariosById } from "../../services/usersApi";
import { useAuth } from "../../hooks/useAuths";
import { getRoleLabel } from "../../types/roles";
import type { UserInfo } from "../../types/userInfo";

interface PageRightProps {
  idToShow: number | null;
}

export default function PageRight({ idToShow }: PageRightProps) {
  const { token } = useAuth();
  const [usuario, setUsuario] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || idToShow == null) {
      setUsuario(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await listadousuariosById(idToShow);
        if (!cancelled) {
          setUsuario(data);
          if (!data) {
            setError("No se encontró el usuario seleccionado.");
          }
        }
      } catch {
        if (!cancelled) {
          setUsuario(null);
          setError("No se pudo cargar el detalle del usuario.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadUser();

    return () => {
      cancelled = true;
    };
  }, [token, idToShow]);

  if (idToShow == null) {
    return (
      <p className="text-slate-600">
        Selecciona un usuario en el panel izquierdo para ver su detalle.
      </p>
    );
  }

  if (!token) {
    return (
      <p className="text-slate-600">
        Inicia sesión para ver el detalle del usuario.
      </p>
    );
  }

  if (loading) {
    return <p className="text-slate-600">Cargando detalle…</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!usuario) {
    return null;
  }

  const roleLabel = getRoleLabel(usuario.roleName);
  const displayName = usuario.username ?? `Usuario ${usuario.id}`;

  return (
    <div className="space-y-4">
      <dl className="space-y-3 text-slate-700">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            ID
          </dt>
          <dd className="mt-1 font-medium text-slate-900">{usuario.id}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Usuario
          </dt>
          <dd className="mt-1 font-medium text-slate-900">{displayName}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Rol
          </dt>
          <dd className="mt-1 font-medium text-slate-900">{roleLabel}</dd>
        </div>
      </dl>
    </div>
  );
}

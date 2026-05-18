import { useMemo, useState } from "react";

import {
  USUARIOS_PANEL_HEADER_BY_ROLE,
  USUARIOS_PANEL_HEADER_DEFAULT,
} from "../usuarios/usuariosPanelHeaders";

import { useAuth } from "../../hooks/useAuths";

import PageLeft from "../usuarios/PageLeft";
import PageRight from "../usuarios/PageRight";

export default function UsuariosParentLayout() {
  const { user } = useAuth();

  const [idToShow, setIdToShow] = useState<number | null>(null);
  const isAdmin = user?.rol === "ROLE_ADMIN";

  const header = useMemo(() => {
    const rol = user?.rol;

    if (!rol) {
      return USUARIOS_PANEL_HEADER_DEFAULT;
    }

    return (
      USUARIOS_PANEL_HEADER_BY_ROLE[rol] ??
      USUARIOS_PANEL_HEADER_DEFAULT
    );
  }, [user?.rol]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 bg-slate-50 p-4">
      {/* HEADER PRINCIPAL */}
      <header className="shrink-0 px-2">
        <h2 className="text-2xl font-bold text-slate-900">
          {header.title}
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          {header.description}
        </p>
      </header>

      {/* GRID PRINCIPAL */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">

        {/* COLUMNA IZQUIERDA */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* TITULO */}
          <h3 className="shrink-0 border-b border-slate-100 bg-indigo-50 px-4 py-3 font-semibold text-indigo-900">
            Usuarios
          </h3>

          {/* SUBHEADER / TOOLBAR FIJA */}
          <div className="shrink-0 border-b border-slate-100 bg-white p-4">
            <div className="flex flex-wrap gap-2">

              <button
              onClick={() => {
                if (user?.id != null) {
                  setIdToShow(user.id);
                }
              }}
                className="
                  rounded-lg
                  bg-indigo-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-indigo-700
                "
              >
                {user
                  ? `Editar tus datos (${user.username})`
                  : "Editar tus datos"}
              </button>

              <button
                disabled={!isAdmin}
                className={`
    rounded-lg
    border
    px-4
    py-2
    text-sm
    font-medium
    transition
    ${isAdmin
                    ? `
          border-slate-300
          text-slate-700
          hover:bg-slate-100
        `
                    : `
          cursor-not-allowed
          border-slate-200
          text-slate-400
          bg-slate-100
        `
                  }
  `}
              >
                Crear Nuevo Usuario (Solo rol Administrador)
              </button>

            </div>
          </div>

          {/* CONTENIDO CON SCROLL */}
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <PageLeft
              selectedId={idToShow}
              onSelectId={setIdToShow}
            />
          </div>
        </section>

        {/* COLUMNA DERECHA */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <h3 className="shrink-0 border-b border-slate-100 bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
            Detalle de usuario
          </h3>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <PageRight idToShow={idToShow} />
          </div>
        </section>

      </div>
    </div>
  );
}
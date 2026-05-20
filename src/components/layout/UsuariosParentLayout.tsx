import { useMemo, useRef, useState } from "react";

import {
  USUARIOS_PANEL_HEADER_BY_ROLE,
  USUARIOS_PANEL_HEADER_DEFAULT,
} from "../usuarios/usuariosPanelHeaders";

import { useAuth } from "../../hooks/useAuths";

import PageLeft from "../usuarios/PageLeft";
import PageRight from "../usuarios/PageRight";
import UserCreateForm from "../usuarios/UserCreateForm";
import UserCreatedSuccess from "../usuarios/UserCreateSucess";

export default function UsuariosParentLayout() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] =  useState(0);

  const handleUserCreated = () => {
    // refresca listado
    setRefreshKey((prev) => prev + 1);
  
    // cambia panel derecho
    setIdToShow(-2);
  };

  const [idToShow, setIdToShow] =
    useState<number | null>(null);

  const isAdmin =
    user?.rol === "ROLE_ADMIN";

  // RESIZE PANELS
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  // LEFT:
  // min 25%
  // max 50%
  const [leftWidth, setLeftWidth] =
    useState(25);

  const [isDragging, setIsDragging] =
    useState(false);

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

  const handleMouseDown = () => {
    setIsDragging(true);

    const handleMouseMove = (
      e: MouseEvent
    ) => {
      if (!containerRef.current) return;

      const rect =
        containerRef.current.getBoundingClientRect();

      const percentage =
        ((e.clientX - rect.left) /
          rect.width) *
        100;

      // límites:
      // left min 25%
      // left max 50%
      const clamped =
        Math.min(
          Math.max(percentage, 20),
          50
        );

      setLeftWidth(clamped);
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );
  };

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

      {/* CONTENEDOR PRINCIPAL */}
      <div
        ref={containerRef}
        className="flex min-h-0 flex-1 gap-2"
      >
        {/* COLUMNA IZQUIERDA */}
        <section
          style={{
            width: `${leftWidth}%`,
          }}
          className="
            flex
            min-h-0
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          {/* TITULO */}
          <h3
            className="
              shrink-0
              border-b
              border-slate-100
              bg-indigo-50
              px-4
              py-3
              font-semibold
              text-indigo-900
            "
          >
            Usuarios
          </h3>

          {/* TOOLBAR */}
          <div
            className="
              shrink-0
              border-b
              border-slate-100
              bg-white
              p-4
            "
          >
            <div className="flex flex-wrap gap-2">
              {/* EDITAR MIS DATOS */}
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
                  ? `Ver tus datos (${user.username})`
                  : "Ver tus datos"}
              </button>

              {/* CREAR USUARIO */}
              <button
                              onClick={() => {
                                if (user?.id != null) {
                                  setIdToShow(-1);
                                }
                              }}

                disabled={!isAdmin}
                className={`
                  rounded-lg
                  border
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${
                    isAdmin
                      ? `
                        border-slate-300
                        text-slate-700
                        hover:bg-slate-100
                      `
                      : `
                        cursor-not-allowed
                        border-slate-200
                        bg-slate-100
                        text-slate-400
                      `
                  }
                `}
              >
                Crear Nuevo Usuario
                (Solo rol Administrador)
              </button>
            </div>
          </div>

          {/* CONTENIDO */}
          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              p-4
            "
          ><PageLeft
          key={refreshKey}
          selectedId={idToShow}
          onSelectId={setIdToShow}
        />
          </div>
        </section>

        {/* DIVIDER DRAGGABLE */}
        <div
          onMouseDown={handleMouseDown}
          className={`
            w-1
            cursor-col-resize
            rounded-full
            transition-colors
            hover:bg-indigo-400
            ${
              isDragging
                ? "bg-indigo-500"
                : "bg-slate-200"
            }
          `}
        />

        {/* COLUMNA DERECHA */}
        <section
          style={{
            width: `${100 - leftWidth}%`,
          }}
          className="
            flex
            min-h-0
            flex-col
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <h3
            className="
              shrink-0
              border-b
              border-slate-100
              bg-emerald-50
              px-4
              py-3
              font-semibold
              text-emerald-900
            "
          >
            Detalle de usuario
          </h3>

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              p-4
            "
          >
           { idToShow === -1 ? (
  <UserCreateForm
    onCreated={handleUserCreated}
  />
) : idToShow === -2 ? (
  <UserCreatedSuccess />
) : (
  <PageRight idToShow={idToShow} />
)}
  
          </div>
        </section>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { listadousuariosById } from "../../services/usersApi";
import { useAuth } from "../../hooks/useAuths";
import { getRoleLabel } from "../../types/roles";
import type { UserInfo } from "../../types/userInfo";

interface PageRightProps {
  idToShow: number | null;
}

export default function PageRight({
  idToShow,
}: PageRightProps) {
  const { token, user } = useAuth();

  const [usuario, setUsuario] =
    useState<UserInfo | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

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
        const data =
          await listadousuariosById(
            idToShow
          );

        if (!cancelled) {
          setUsuario(data);

          if (!data) {
            setError(
              "No se encontró el usuario seleccionado."
            );
          }
        }
      } catch {
        if (!cancelled) {
          setUsuario(null);

          setError(
            "No se pudo cargar el detalle del usuario."
          );
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

  const getImageSrc = (
    foto?: string | Uint8Array | null
  ) => {
    if (!foto) {
      return null;
    }

    // Base64 string
    if (typeof foto === "string") {
      return foto.startsWith(
        "data:image"
      )
        ? foto
        : `data:image/jpeg;base64,${foto}`;
    }

    // Uint8Array seguro
    const safeArray =
      new Uint8Array(foto);

    const blob = new Blob(
      [safeArray],
      {
        type: "image/jpeg",
      }
    );

    return URL.createObjectURL(blob);
  };

  if (idToShow == null) {
    return (
      <p className="text-slate-600">
        Selecciona un usuario en el
        panel izquierdo para ver su
        detalle.
      </p>
    );
  }

  if (!token) {
    return (
      <p className="text-slate-600">
        Inicia sesión para ver el
        detalle del usuario.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-slate-600">
        Cargando detalle…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-600">
        {error}
      </p>
    );
  }

  if (!usuario) {
    return null;
  }

  const roleLabel = getRoleLabel(
    usuario.roleName
  );

  const displayName =
    usuario.username ??
    `Usuario ${usuario.id}`;

  const isCurrentUser =
    usuario.id === user?.id;

  const imageSrc = getImageSrc(
    usuario.foto
  );

  return (
    <div className="space-y-6">
      
      {/* CARD PRINCIPAL */}
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="flex flex-col gap-6 xl:flex-row">
          
          {/* FOTO */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-center
            "
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={displayName}
                className="
                  h-[250px]
                  w-[250px]
                  rounded-2xl
                  border
                  border-slate-200
                  object-cover
                  shadow-sm
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-[250px]
                  w-[250px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-slate-300
                  bg-slate-100
                  text-sm
                  text-slate-500
                "
              >
                Sin foto
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1">
            
            {/* TITULO */}
            <div className="flex items-center gap-3">
              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
              >
                {displayName}
              </h2>

              {isCurrentUser && (
                <span
                  className="
                    rounded-full
                    bg-indigo-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-indigo-700
                  "
                >
                  TÚ
                </span>
              )}
            </div>

            {/* ROL */}
            <p
              className="
                mt-2
                text-sm
                font-medium
                text-indigo-700
              "
            >
              {roleLabel}
            </p>

            {/* GRID */}
            <div
              className="
                mt-8
                grid
                gap-6
                md:grid-cols-2
              "
            >
              
              {/* ID */}
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  ID
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    text-slate-900
                  "
                >
                  {usuario.id}
                </p>
              </div>

              {/* USERNAME */}
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Username
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    text-slate-900
                  "
                >
                  {usuario.username}
                </p>
              </div>

              {/* NOMBRE */}
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Nombre
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    text-slate-900
                  "
                >
                  {usuario.nombre}
                </p>
              </div>

              {/* APELLIDO */}
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Apellido
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    text-slate-900
                  "
                >
                  {usuario.apellido}
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Email
                </p>

                <p
                  className="
                    mt-1
                    break-all
                    text-base
                    text-slate-900
                  "
                >
                  {usuario.email}
                </p>
              </div>

              {/* PERFIL */}
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  Perfil académico
                </p>

                <p
                  className="
                    mt-1
                    text-base
                    text-slate-900
                  "
                >
                  {usuario.perfilAcademico ??
                    "No especificado"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
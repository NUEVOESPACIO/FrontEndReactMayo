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



  const header = useMemo(() => {

    const rol = user?.rol;

    if (!rol) {

      return USUARIOS_PANEL_HEADER_DEFAULT;

    }

    return (

      USUARIOS_PANEL_HEADER_BY_ROLE[rol] ?? USUARIOS_PANEL_HEADER_DEFAULT

    );

  }, [user?.rol]);



  return (

    <div className="flex h-full min-h-0 flex-col gap-4 bg-slate-50 p-4">

      <header className="shrink-0 px-2">

        <h2 className="text-2xl font-bold text-slate-900">{header.title}</h2>

        <p className="mt-1 text-sm text-slate-600">{header.description}</p>

      </header>



      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">

        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <h3 className="shrink-0 border-b border-slate-100 bg-indigo-50 px-4 py-3 font-semibold text-indigo-900">

            Usuarios

          </h3>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">

            <PageLeft

              selectedId={idToShow}

              onSelectId={setIdToShow}

            />

          </div>

        </section>



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


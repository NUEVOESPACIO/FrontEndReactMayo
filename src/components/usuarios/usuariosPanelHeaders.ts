import type { UsuariosPanelHeader } from "../../types/usuariosPanelTypes";

export const USUARIOS_PANEL_HEADER_BY_ROLE: Record<string, UsuariosPanelHeader> =
  {
    ROLE_ADMIN: {
      title: "Panel de administración de usuarios",
      description:
        "Como administrador puedes consultar, editar, dar de baja, crear nuevos usuarios y cambiar su ROL tambien.",
    },
    ROLE_VISITANTE: {
      title: "Consulta de usuarios",
      description:
        "Vista de solo lectura: explora el listado y consulta información general de cada usuario.",
    },
    ROLE_FISICO: {
      title: "Usuarios con el rol FISICO",
      description:
        "Modifica tu informacion propia, accede a datos generales de todos los usuarios y a información extra sobre otros usuarios con rol de CIENTIFICO.",
    },
    ROLE_ASTRONOMO: {
      title: "Usuarios con rol ASTRONOMO",
      description:
        "Modifica tu informacion propia, accede a datos generales de todos los usuarios y a información extra sobre otros usuarios ASTRONOMOS.",
    },
  };

export const USUARIOS_PANEL_HEADER_DEFAULT: UsuariosPanelHeader = {
  title: "Panel de usuarios",
  description:
    "Inicia sesión con un rol válido para acceder a las funciones del panel.",
};

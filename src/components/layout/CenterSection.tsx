import type { MenuTopicId } from "../../types/menuTypes";
import WelcomeAndLoginLayout from "./WelcomeAndLoginLayout";
import UsuariosParentLayout from "./UsuariosParentLayout";
import PlanetasParentLayout from "./PlanetasParentLayout";
import SimulacionesParentLayout from "./SimulacionesParentLayout";
import SobreMiLayout from "./SobreMiLayout";

interface CenterSectionProps {
  activeMenu: MenuTopicId;
}

function renderCenterContent(activeMenu: MenuTopicId) {
  switch (activeMenu) {
    case "Bienvenida":
      return <WelcomeAndLoginLayout />;
    case "Panel Usuarios":
      return (
        <UsuariosParentLayout
          title="Panel de Usuarios"
          leftTitle="Usuarios"
          rightTitle="Detalle de usuarios"
        />
      );
    case "Panel Planetas":
      return (
        <PlanetasParentLayout
          title="Panel de Planetas"
          leftTitle="Listado de Planetas"
          rightTitle="Detalle de Planetas"
        />
      );
    case "Panel Simulaciones":
      return (
        <SimulacionesParentLayout
          title="Panel de Simulaciones"
          leftTitle="Listado de Simulaciones"
          rightTitle="Detalle de simulaciones"
        />
      );
      case "Sobre mi":
        return (
          <SobreMiLayout />
        );
    default:
      return <WelcomeAndLoginLayout/>;
  }
}

export default function CenterSection({ activeMenu }: CenterSectionProps) {
  return (
    <div className="h-full min-h-0">{renderCenterContent(activeMenu)}</div>
  );
}

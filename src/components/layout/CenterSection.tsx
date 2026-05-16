import type { MenuTopicId } from "../../types/menuTypes";
import WelcomeLayout from "./WelcomeLayout";
import SingleColumnLayout from "./SingleColumnLayout";
import TwoColumnLayout from "./TwoColumnLayout";

interface CenterSectionProps {
  activeMenu: MenuTopicId;
}

function renderCenterContent(activeMenu: MenuTopicId) {
  switch (activeMenu) {
    case "Bienvenida":
      return <WelcomeLayout />;
    case "Panel Usuarios":
      return <SingleColumnLayout title="Topic 1 — Single column" />;
    case "Panel Planetas":
      return (
        <TwoColumnLayout
          title="Topic 2 — Two columns"
          leftTitle="Column A"
          rightTitle="Column B"
        />
      );
    case "Panel Simulaciones":
      return (
        <TwoColumnLayout
          title="Topic 3 — Two columns"
          leftTitle="Primary panel"
          rightTitle="Secondary panel"
        />
      );
    default:
      return <WelcomeLayout />;
  }
}

export default function CenterSection({ activeMenu }: CenterSectionProps) {
  return (
    <div className="h-full min-h-0">{renderCenterContent(activeMenu)}</div>
  );
}

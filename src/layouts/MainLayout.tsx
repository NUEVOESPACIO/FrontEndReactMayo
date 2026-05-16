import { useState } from "react";

import type { MenuTopicId } from "../types/menuTypes";
import Header from "../components/layout/Header";
import TopicMenu from "../components/layout/TopicMenu";
import Footer from "../components/layout/Footer";
import CenterSection from "../components/layout/CenterSection";

export default function MainLayout() {
  const [activeMenu, setActiveMenu] = useState<MenuTopicId>("Bienvenida");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100">
      <Header />
      <TopicMenu activeId={activeMenu} onSelect={setActiveMenu} />

      <main className="min-h-0 flex-1 overflow-hidden">
        <CenterSection activeMenu={activeMenu} />
      </main>

      <Footer />
    </div>
  );
}

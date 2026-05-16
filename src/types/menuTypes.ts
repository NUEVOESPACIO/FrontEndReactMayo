export type MenuTopicId = "Bienvenida" | "Panel Usuarios" | "Panel Planetas" | "Panel Simulaciones" | "Sobre mi";

export interface MenuTopic {
  id: MenuTopicId;
  label: string;
}

export const MENU_TOPICS: MenuTopic[] = [
  { id: "Bienvenida", label: "Bienvenida" },
  { id: "Panel Usuarios", label: "Panel Usuarios" },
  { id: "Panel Planetas", label: "Panel Planetas" },
  { id: "Panel Simulaciones", label: "Panel Simulaciones" },
  { id: "Sobre mi", label: "Sobre mi" },
  
];

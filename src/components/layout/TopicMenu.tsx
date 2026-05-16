import type { MenuTopicId } from "../../types/menuTypes";
import { MENU_TOPICS } from "../../types/menuTypes";

interface TopicMenuProps {
  activeId: MenuTopicId;
  onSelect: (id: MenuTopicId) => void;
}

export default function TopicMenu({ activeId, onSelect }: TopicMenuProps) {
  return (
    <nav
      aria-label="Topic menu"
      className="shrink-0 border-b border-slate-200 bg-white shadow-sm"
    >
      <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2">
        {MENU_TOPICS.map((topic) => {
          const isActive = activeId === topic.id;

          return (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => onSelect(topic.id)}
                className={`
                  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap
                  transition-colors
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                `}
              >
                {topic.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

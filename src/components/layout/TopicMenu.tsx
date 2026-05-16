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
      className="shrink-0 border-b border-indigo-200/80 bg-indigo-100 shadow-sm"
    >
      <ul className="flex justify-start gap-2 overflow-x-auto px-6 py-3">
        {MENU_TOPICS.map((topic) => {
          const isActive = activeId === topic.id;

          return (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => onSelect(topic.id)}
                className={`
                  rounded-lg px-5 py-2.5 text-base font-semibold whitespace-nowrap
                  transition-colors sm:text-lg
                  ${
                    isActive
                      ? "bg-violet-700 text-white shadow-md ring-2 ring-violet-400/50"
                      : "bg-white/80 text-indigo-900 hover:bg-white hover:text-violet-800"
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

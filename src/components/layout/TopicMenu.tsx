import type { MenuTopicId } from "../../types/menuTypes";
import { MENU_TOPICS } from "../../types/menuTypes";
import UserSessionMenu from "./UserSessionMenu";

interface TopicMenuProps {
  activeId: MenuTopicId | null;
  onSelect: (id: MenuTopicId) => void;
  onAfterLogout: () => void;
}

export default function TopicMenu({
  activeId,
  onSelect,
  onAfterLogout,
}: TopicMenuProps) {
  return (
    <nav
      aria-label="Topic menu"
      className="relative z-30 shrink-0 border-b border-indigo-200/80 bg-indigo-100 shadow-sm"
    >
      <div className="flex items-center gap-3 px-6 py-3">
        <UserSessionMenu
          onSelectMenu={onSelect}
          onAfterLogout={onAfterLogout}
        />
        <ul className="flex min-w-0 flex-1 justify-start gap-2 overflow-x-auto">
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
      </div>
    </nav>
  );
}

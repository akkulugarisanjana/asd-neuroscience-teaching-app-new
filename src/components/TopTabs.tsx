import { useAppStore } from "../state/useAppStore";

const tabs = [
  { id: "communication", label: "Communication" },
  { id: "emotions",      label: "Emotions" },
  { id: "social",        label: "Social Skills" },
  { id: "progress",      label: "Progress" }
] as const;

export default function TopTabs() {
  const tab = useAppStore(s => s.tab);
  const setTab = useAppStore(s => s.setTab);

  return (
    <nav className="w-full border-b bg-white/70 backdrop-blur">
      <ul className="mx-auto flex max-w-5xl items-stretch justify-between">
        {tabs.map(t => {
          const active = tab === (t.id as any);
          return (
            <li key={t.id}>
              <button
                onClick={() => setTab(t.id as any)}
                className={`btn px-4 py-3 text-lg md:text-xl focus:outline-none focus-visible:ring rounded-none
                  ${active ? "font-extrabold underline underline-offset-4" : "font-semibold"}
                `}
                aria-current={active ? "page" : undefined}
              >
                {t.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
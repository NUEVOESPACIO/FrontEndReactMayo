import { LOREM_PARAGRAPHS } from "../../constants/loremIpsum";

interface TwoColumnLayoutProps {
  title: string;
  leftTitle: string;
  rightTitle: string;
}

export default function UsuariosParentLayout({
  title,
  leftTitle,
  rightTitle,
}: TwoColumnLayoutProps) {
  const leftParagraphs = LOREM_PARAGRAPHS.slice(0, 5);
  const rightParagraphs = LOREM_PARAGRAPHS.slice(3);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 bg-slate-50 p-4">
      <header className="shrink-0 px-2">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">
          Two independent scroll areas — each column scrolls on its own when
          content overflows.
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <h3 className="shrink-0 border-b border-slate-100 bg-indigo-50 px-4 py-3 font-semibold text-indigo-900">
            {leftTitle}
          </h3>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              {leftParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <h3 className="shrink-0 border-b border-slate-100 bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
            {rightTitle}
          </h3>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              {rightParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import { LOREM_PARAGRAPHS } from "../../constants/loremIpsum";

interface SingleColumnLayoutProps {
  title: string;
}

export default function SingleColumnLayout({ title }: SingleColumnLayoutProps) {
  return (
    <div className="h-full min-h-0 overflow-y-auto bg-white p-6">
      <article className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mb-6 text-slate-600">
          Single-column layout with one scroll area for all content below the
          fixed header, menu, and footer.
        </p>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          {LOREM_PARAGRAPHS.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

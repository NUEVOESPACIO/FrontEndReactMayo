export default function Footer() {
  return (
    <footer className="shrink-0 border-t border-violet-800/40 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 text-left text-base text-indigo-100 shadow-inner sm:text-lg">
      <p className="font-medium">
        &copy; {new Date().getFullYear()} Gravity &mdash; Fixed footer. Lorem
        ipsum dolor sit amet.
      </p>
    </footer>
  );
}

export default function GoodbyeLayout() {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-indigo-50 via-white to-violet-50 px-6 py-12">
      <div className="mx-auto max-w-lg rounded-2xl border border-indigo-200/90 bg-white px-8 py-10 text-center shadow-lg shadow-indigo-100/60">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
          Sesión cerrada
        </p>
        <h1 className="mt-3 text-3xl font-bold text-indigo-950 sm:text-4xl">
          ¡Hasta pronto!
        </h1>
        <p className="mt-4 text-base leading-relaxed text-indigo-700">
          Gracias por usar Gravity. Has cerrado sesión correctamente.
        </p>
        <p className="mt-6 text-sm font-medium text-violet-800">
          Elige una opción del menú superior para continuar.
        </p>
      </div>
    </div>
  );
}

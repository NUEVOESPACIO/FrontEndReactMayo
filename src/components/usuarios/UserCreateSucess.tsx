export default function UserCreatedSuccess() {
    return (
      <div
        className="
          flex
          h-full
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            p-10
            text-center
            shadow-sm
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-emerald-700
            "
          >
            Usuario creado correctamente
          </h2>
  
          <p className="mt-2 text-slate-600">
            El listado fue actualizado.
          </p>
        </div>
      </div>
    );
  }
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="theme-page">
      <div className="theme-container">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm theme-surface"
              style={{ color: "var(--text-main)" }}
            >
              Sistema web CRUD completo em React + Node + MySQL
            </div>

            <div className="space-y-4">
              <h1
                className="text-4xl md:text-6xl font-black leading-tight tracking-tight"
                style={{ color: "var(--text-main)" }}
              >
                Gerencie itens com um visual
                <span className="block" style={{ color: "var(--primary)" }}>
                  moderno, limpo e agradável
                </span>
              </h1>

              <p
                className="text-lg md:text-xl leading-relaxed max-w-2xl"
                style={{ color: "var(--text-soft)" }}
              >
                O Item Manager é um sistema para cadastro, edição, visualização,
                exclusão e organização de itens aeronáuticos, com tema claro e
                escuro, ordenação, busca e visualização detalhada.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/manager"
                className="theme-btn theme-btn-primary px-6 py-3"
              >
                Entrar no Manager
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="rounded-3xl p-5 theme-surface">
                <p className="text-sm mb-1" style={{ color: "var(--text-soft)" }}>
                  Frontend
                </p>
                <p className="font-bold text-lg" style={{ color: "var(--text-main)" }}>
                  React
                </p>
              </div>

              <div className="rounded-3xl p-5 theme-surface">
                <p className="text-sm mb-1" style={{ color: "var(--text-soft)" }}>
                  Backend
                </p>
                <p className="font-bold text-lg" style={{ color: "var(--text-main)" }}>
                  Node + Express
                </p>
              </div>

              <div className="rounded-3xl p-5 theme-surface">
                <p className="text-sm mb-1" style={{ color: "var(--text-soft)" }}>
                  Banco
                </p>
                <p className="font-bold text-lg" style={{ color: "var(--text-main)" }}>
                  MySQL
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden theme-surface-strong">
              <div
                className="aspect-[4/3] p-6 md:p-8 flex items-end"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)"
                }}
              >
                <div className="w-full space-y-4">
                  <div className="w-24 h-2 rounded-full bg-white/60"></div>
                  <div className="w-40 h-2 rounded-full bg-white/40"></div>

                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="rounded-2xl bg-white/15 backdrop-blur p-4 text-white shadow-lg">
                      <p className="text-sm opacity-80">Busca inteligente</p>
                      <p className="text-xl font-black">Rápida</p>
                    </div>

                    <div className="rounded-2xl bg-white/15 backdrop-blur p-4 text-white shadow-lg">
                      <p className="text-sm opacity-80">Tema</p>
                      <p className="text-xl font-black">Claro / Escuro</p>
                    </div>

                    <div className="rounded-2xl bg-white/15 backdrop-blur p-4 text-white shadow-lg">
                      <p className="text-sm opacity-80">CRUD</p>
                      <p className="text-xl font-black">Completo</p>
                    </div>

                    <div className="rounded-2xl bg-white/15 backdrop-blur p-4 text-white shadow-lg">
                      <p className="text-sm opacity-80">Visual</p>
                      <p className="text-xl font-black">Premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 rounded-2xl theme-surface-strong px-5 py-4">
              <p className="text-sm" style={{ color: "var(--text-soft)" }}>
                Desenvolvido por
              </p>
              <p className="font-black" style={{ color: "var(--text-main)" }}>
                Gustavo Lona Grespan
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;

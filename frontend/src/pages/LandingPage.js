import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-blue-200 dark:border-cyan-900 bg-white/70 dark:bg-gray-900/70 backdrop-blur px-4 py-2 text-sm font-semibold shadow-sm">
              Sistema web CRUD completo em React + Node + MySQL
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                Gerencie itens com um visual
                <span className="block text-blue-600 dark:text-cyan-400">
                  moderno, claro e profissional
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                O Item Manager é um sistema para cadastro, edição, visualização,
                exclusão e organização de itens aeronáuticos, com tema claro e
                escuro, ordenação, busca e visualização detalhada.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/manager"
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
              >
                Entrar no Manager
              </Link>

              <Link
                to="/novo"
                className="px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-white/40 dark:border-gray-700 font-bold shadow-lg backdrop-blur transition hover:scale-[1.02]"
              >
                Cadastrar novo item
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5 border border-white/40 dark:border-gray-800 shadow-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Frontend</p>
                <p className="font-bold text-lg">React</p>
              </div>

              <div className="rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5 border border-white/40 dark:border-gray-800 shadow-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Backend</p>
                <p className="font-bold text-lg">Node + Express</p>
              </div>

              <div className="rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5 border border-white/40 dark:border-gray-800 shadow-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Banco</p>
                <p className="font-bold text-lg">MySQL</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden border border-white/40 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur shadow-2xl">
              <div className="aspect-[4/3] p-6 md:p-8 flex items-end bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-700">
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

            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white dark:bg-gray-900 shadow-xl px-5 py-4 border border-white/40 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Desenvolvido por</p>
              <p className="font-black text-gray-900 dark:text-white">
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

import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getFlag } from "../utils/flags";

function Edit() {
  const [form, setForm] = useState({
    foto: "",
    pais: "",
    nome: "",
    descricao: "",
    preco_minimo: "",
    preco_maximo: ""
  });

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const countries = [
    "USSR",
    "USA",
    "Alemanha",
    "França",
    "Reino Unido",
    "China",
    "Japão",
    "Itália",
    "Suécia"
  ];

  useEffect(() => {
    if (id) {
      api.get(`/items/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => setErro("Erro ao carregar item"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.nome || !form.pais) {
      setErro("Preencha nome e país!");
      return;
    }

    if (isNaN(form.preco_minimo) || isNaN(form.preco_maximo)) {
      setErro("Preços devem ser números!");
      return;
    }

    try {
      setLoading(true);

      if (id) {
        await api.put(`/items/${id}`, form);
      } else {
        await api.post("/items", form);
      }

      navigate("/manager");
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao salvar item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="rounded-[2rem] bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl border border-white/40 dark:border-gray-800 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-700 min-h-[320px] lg:min-h-full flex items-center justify-center overflow-hidden">
              {getFlag(form.pais) && (
                <img
                  src={getFlag(form.pais)}
                  alt=""
                  className="absolute top-0 left-0 w-[60%] h-[60%] object-contain z-0 opacity-95"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              {form.foto ? (
                <img
                  src={form.foto}
                  alt={form.nome}
                  className="relative z-10 max-w-[82%] max-h-[82%] object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="relative z-10 text-white text-center px-6">
                  <p className="text-2xl font-black mb-2">
                    {id ? "Editar Item" : "Novo Item"}
                  </p>
                  <p className="text-white/80">
                    A prévia da imagem aparecerá aqui.
                  </p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 z-20">
                <h1 className="text-white text-2xl md:text-3xl font-black">
                  {form.nome || (id ? "Editar Item" : "Novo Item")}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-3xl font-black">
                    {id ? "Editar Item" : "Cadastrar Item"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Preencha os dados com cuidado para manter o catálogo organizado.
                  </p>
                </div>

                <Link
                  to="/manager"
                  className="hidden md:inline-flex px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold"
                >
                  Voltar
                </Link>
              </div>

              {erro && (
                <div className="mb-5 rounded-2xl border border-red-300 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800 px-4 py-3">
                  {erro}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Imagem (URL)
                    </label>
                    <input
                      className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-2xl bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.foto}
                      onChange={(e) => setForm({ ...form, foto: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      País
                    </label>
                    <select
                      className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-2xl bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.pais}
                      onChange={(e) => setForm({ ...form, pais: e.target.value })}
                    >
                      <option value="">Selecione</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Nome
                    </label>
                    <input
                      className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-2xl bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Descrição
                    </label>
                    <input
                      className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-2xl bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.descricao}
                      onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Preço Mínimo
                    </label>
                    <input
                      className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-2xl bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.preco_minimo}
                      onChange={(e) => setForm({ ...form, preco_minimo: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Preço Máximo
                    </label>
                    <input
                      className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-2xl bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.preco_maximo}
                      onChange={(e) => setForm({ ...form, preco_maximo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
                  >
                    {loading ? "Salvando..." : "Salvar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/manager")}
                    className="px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 font-bold transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;

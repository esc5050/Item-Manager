import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import { getFlag } from "../utils/flags";

function ViewItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  const formatPrice = (value) => {
    const num = Number(value);

    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(1)} Bilhões`;
    }

    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)} Milhões`;
    }

    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)} Mil`;
    }

    return num.toString();
  };

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        setErro("");

        const res = await api.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        setErro("Erro ao carregar item.");
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen text-black dark:text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
          <div className="h-[520px] rounded-[2rem] bg-white/70 dark:bg-gray-900/70 animate-pulse shadow-2xl border border-white/40 dark:border-gray-800" />
        </div>
      </div>
    );
  }

  if (erro || !item) {
    return (
      <div className="min-h-screen text-black dark:text-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
          <div className="rounded-[2rem] bg-white/80 dark:bg-gray-900/80 shadow-2xl p-10 text-center border border-white/40 dark:border-gray-800">
            <h1 className="text-3xl font-black mb-3">Item não encontrado</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {erro || "Não foi possível localizar este item."}
            </p>
            <button
              onClick={() => navigate("/manager")}
              className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-semibold transition"
            >
              Voltar para o Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="rounded-[2rem] overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[380px] md:min-h-[540px] bg-gray-200 dark:bg-gray-950 flex items-center justify-center overflow-hidden">
              {getFlag(item.pais) && (
                <img
                  src={getFlag(item.pais)}
                  alt=""
                  className="absolute top-0 left-0 w-[60%] h-[60%] object-contain z-0 opacity-95"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              {item.foto && (
                <img
                  src={item.foto}
                  alt={item.nome}
                  className="relative z-10 max-w-[88%] max-h-[88%] object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 py-5">
                <h1 className="text-white text-2xl md:text-4xl font-black">
                  {item.nome}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 text-sm font-semibold">
                  {item.pais}
                </span>

                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100 text-sm font-semibold">
                  ID #{item.id}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                    Nome
                  </p>
                  <p className="text-2xl font-black">{item.nome}</p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                    País
                  </p>
                  <p className="text-lg font-semibold">{item.pais}</p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">
                    Descrição
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                    {item.descricao || "Sem descrição cadastrada."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 p-5 shadow-sm">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-1">
                      Preço mínimo
                    </p>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {formatPrice(item.preco_minimo)}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900 p-5 shadow-sm">
                    <p className="text-sm text-cyan-700 dark:text-cyan-300 mb-1">
                      Preço máximo
                    </p>
                    <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
                      {formatPrice(item.preco_maximo)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={`/edit/${item.id}`}
                  className="rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 font-semibold transition"
                >
                  Editar item
                </Link>

                <button
                  onClick={() => navigate("/manager")}
                  className="rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 px-5 py-3 font-semibold transition"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItem;

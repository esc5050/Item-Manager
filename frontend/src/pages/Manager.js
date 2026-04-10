import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { getFlag } from "../utils/flags";

function Manager() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("asc");
  const [field, setField] = useState("preco_minimo");
  const [search, setSearch] = useState("");
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

  const loadItems = async () => {
    try {
      setLoading(true);
      setErro("");

      const res = await api.get("/items");
      let data = [...res.data];

      data = data.filter((item) =>
        item.nome.toLowerCase().includes(search.toLowerCase())
      );

      data.sort((a, b) => {
        const valA = Number(a[field]);
        const valB = Number(b[field]);

        return order === "asc" ? valA - valB : valB - valA;
      });

      setItems(data);
    } catch (err) {
      setErro("Erro ao carregar itens.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, field, search]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja deletar este item?");
    if (!confirmar) return;

    try {
      await api.delete(`/items/${id}`);
      loadItems();
    } catch (err) {
      setErro("Erro ao deletar item.");
    }
  };

  return (
    <div className="min-h-screen text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8 rounded-[2rem] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/40 dark:border-gray-800 shadow-2xl p-5 md:p-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Gerenciador de Itens
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Explore os itens, filtre por nome e organize por preço mínimo ou máximo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_auto_auto_auto] gap-3">
              <input
                type="text"
                placeholder="Buscar por nome do item..."
                className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() =>
                  setField(
                    field === "preco_minimo" ? "preco_maximo" : "preco_minimo"
                  )
                }
                className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 font-semibold shadow-md transition hover:scale-[1.02]"
              >
                Campo: {field === "preco_minimo" ? "Mínimo" : "Máximo"}
              </button>

              <button
                onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                className="rounded-2xl bg-green-600 hover:bg-green-700 text-white px-4 py-3 font-semibold shadow-md transition hover:scale-[1.02]"
              >
                Ordem: {order === "asc" ? "Crescente" : "Decrescente"}
              </button>

              <Link
                to="/novo"
                className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-semibold shadow-md transition hover:scale-[1.02] text-center"
              >
                + Novo Item
              </Link>
            </div>
          </div>
        </div>

        {erro && (
          <div className="mb-6 rounded-2xl border border-red-300 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800 px-4 py-3">
            {erro}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-72 rounded-3xl bg-white/60 dark:bg-gray-800/60 animate-pulse shadow-md"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[2rem] bg-white/70 dark:bg-gray-900/70 shadow-2xl p-10 text-center border border-white/40 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-2">Nenhum item encontrado</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Tente mudar a busca ou cadastre um novo item.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl rounded-[1.75rem] shadow-xl border border-white/40 dark:border-gray-800 overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-950 flex items-center justify-center overflow-hidden">
                  {getFlag(item.pais) && (
                    <img
                      src={getFlag(item.pais)}
                      alt=""
                      className="absolute top-0 left-0 w-[60%] h-[60%] object-contain z-0 pointer-events-none opacity-95"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}

                  <Link
                    to={`/item/${item.id}`}
                    className="absolute inset-0 z-10 flex items-center justify-center"
                  >
                    {item.foto && (
                      <img
                        src={item.foto}
                        alt={item.nome}
                        className="max-w-full max-h-full object-contain transition duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </Link>

                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 py-3">
                    <Link
                      to={`/item/${item.id}`}
                      className="inline-block text-white text-xs md:text-sm font-bold leading-tight hover:text-cyan-300 transition"
                    >
                      {item.nome}
                    </Link>
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold border border-gray-200 dark:border-gray-700">
                      {item.pais}
                    </div>

                    <p className="text-[11px] md:text-xs font-medium text-gray-700 dark:text-gray-200">
                      💰 {formatPrice(item.preco_minimo)} - {formatPrice(item.preco_maximo)}
                    </p>
                  </div>
                </div>

                <div className="flex border-t border-gray-300 dark:border-gray-800 text-xs md:text-sm">
                  <Link
                    to={`/edit/${item.id}`}
                    className="w-1/2 text-center py-3 border-r border-gray-300 dark:border-gray-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition font-semibold"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-1/2 py-3 hover:bg-red-100 dark:hover:bg-red-900/40 transition font-semibold"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Manager;

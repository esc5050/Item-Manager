import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { getFlag } from "../utils/flags";

function Manager() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("asc");
  const [field, setField] = useState("preco_minimo");
  const [search, setSearch] = useState("");

  const formatPrice = (value) => {
    const num = Number(value);

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + " Bilhões";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + " Milhões";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + " Mil";
    }
    return num.toString();
  };

  const loadItems = async () => {
    try {
      const res = await api.get("/items");
      let data = [...res.data];

      data = data.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase())
      );

      data.sort((a, b) => {
        const valA = Number(a[field]);
        const valB = Number(b[field]);

        return order === "asc" ? valA - valB : valB - valA;
      });

      setItems(data);
    } catch {
      console.error("Erro ao carregar");
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line
  }, [order, field, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza?")) return;

    try {
      await api.delete(`/items/${id}`);
      loadItems();
    } catch {
      alert("Erro ao deletar");
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-black dark:text-white transition-all duration-500">

      {/* HEADER */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">

        <input
          placeholder="🔍 Buscar item..."
          className="w-full md:w-1/3 p-3 rounded-xl border bg-white/70 dark:bg-gray-800/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={() =>
              setField(field === "preco_minimo" ? "preco_maximo" : "preco_minimo")
            }
            className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:scale-105 transition"
          >
            {field === "preco_minimo" ? "Preço Min" : "Preço Max"}
          </button>

          <button
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
            className="px-4 py-2 rounded-xl bg-green-600 text-white hover:scale-105 transition"
          >
            {order === "asc" ? "↑" : "↓"}
          </button>

          <Link
            to="/novo"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:scale-105 transition"
          >
            + Novo
          </Link>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {items.map(item => (
          <div
            key={item.id}
            className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
          >

            {/* IMAGEM */}
            <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">

              {/* BANDEIRA */}
              {getFlag(item.pais) && (
                <img
                  src={getFlag(item.pais)}
                  alt=""
                  className="absolute top-0 left-0 w-[60%] h-[60%] object-contain opacity-70 z-0"
                />
              )}

              {/* IMAGEM ITEM */}
              {item.foto && (
                <img
                  src={item.foto}
                  alt=""
                  className="relative z-10 max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              )}

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

              {/* NOME */}
              <div className="absolute bottom-0 left-0 p-2 text-white text-xs font-bold z-20">
                {item.nome}
              </div>

            </div>

            {/* PREÇO */}
            <div className="p-3 text-xs flex-1">
              💰 {formatPrice(item.preco_minimo)} - {formatPrice(item.preco_maximo)}
            </div>

            {/* BOTÕES */}
            <div className="flex text-xs border-t border-gray-300 dark:border-gray-700">

              <Link
                to={`/edit/${item.id}`}
                className="w-1/2 text-center py-2 border-r border-gray-300 dark:border-gray-700 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
              >
                ✏️ Editar
              </Link>

              <button
                onClick={() => handleDelete(item.id)}
                className="w-1/2 py-2 hover:bg-red-200 dark:hover:bg-red-800 transition"
              >
                🗑 Deletar
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Manager;

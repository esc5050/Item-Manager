import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { getFlag } from "../utils/flags";

function Manager() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("asc");
  const [field, setField] = useState("preco_minimo");
  const [search, setSearch] = useState("");

  // FORMATADOR
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
    } catch (err) {
      console.error("Erro ao carregar itens");
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
      alert("Erro ao deletar item");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      {/* BUSCA */}
      <input
        placeholder="Buscar por nome..."
        className="mb-4 p-2 border w-full bg-white dark:bg-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CONTROLES */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() =>
            setField(field === "preco_minimo" ? "preco_maximo" : "preco_minimo")
          }
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          Campo: {field === "preco_minimo" ? "Min" : "Max"}
        </button>

        <button
          onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          {order === "asc" ? "↑" : "↓"}
        </button>

        <Link
          to="/novo"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Novo
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {items.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded shadow flex flex-col overflow-hidden text-sm"
          >

            {/* IMAGEM */}
            <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center">

              {/* BANDEIRA */}
              {getFlag(item.pais) && (
                <img
                  src={getFlag(item.pais)}
                  alt=""
                  className="absolute top-0 left-0 w-[60%] h-[60%] object-contain z-0"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}

              {/* IMAGEM ITEM */}
              {item.foto && (
                <img
                  src={item.foto}
                  alt=""
                  className="relative z-10 max-w-full max-h-full object-contain"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}

              {/* NOME SOBRE A IMAGEM */}
              <div className="absolute bottom-0 left-0 bg-black/70 text-white px-2 py-1 text-xs font-bold z-20">
                {item.nome}
              </div>

            </div>

            {/* PREÇO */}
            <div className="p-2 flex-1 text-xs">
              <p>
                💰 {formatPrice(item.preco_minimo)} - {formatPrice(item.preco_maximo)}
              </p>
            </div>

            {/* BOTÕES */}
            <div className="flex border-t border-gray-300 dark:border-gray-700 text-xs">

              <Link
                to={`/edit/${item.id}`}
                className="w-1/2 text-center p-2 border-r border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Editar
              </Link>

              <button
                onClick={() => handleDelete(item.id)}
                className="w-1/2 p-2 hover:bg-red-100 dark:hover:bg-red-900"
              >
                Deletar
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Manager;

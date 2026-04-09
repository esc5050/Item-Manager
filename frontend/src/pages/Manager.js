import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { getFlag } from "../utils/flags";

function Manager() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("asc");
  const [field, setField] = useState("preco_minimo");
  const [search, setSearch] = useState("");

  const loadItems = async () => {
    try {
      const res = await api.get("/items");
      let data = [...res.data];

      // FILTRO
      data = data.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase())
      );

      // ORDENAÇÃO
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {items.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          >

            {/* IMAGEM */}
            <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden rounded">

              {/* BANDEIRA (AGORA NO CANTO SUPERIOR ESQUERDO) */}
              {getFlag(item.pais) && (
                <img
                  src={getFlag(item.pais)}
                  alt=""
                  className="absolute top-2 left-2 w-1/2 h-1/2 object-contain z-20"
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

            </div>

            <h2 className="mt-2 font-bold">{item.nome}</h2>

            <p>
              💰 {item.preco_minimo} - {item.preco_maximo}
            </p>

            <div className="flex gap-2 mt-2">
              <Link to={`/edit/${item.id}`} className="text-yellow-500">
                Editar
              </Link>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
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

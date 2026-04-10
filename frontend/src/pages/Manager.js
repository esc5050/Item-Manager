import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { getFlag } from "../utils/flags";
import DeleteItemModal from "../components/DeleteItemModal";

function Manager() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("asc");
  const [field, setField] = useState("preco_minimo");
  const [search, setSearch] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const formatPrice = (value) => {
    const num = Number(value);

    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(1)}B`;
    }

    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }

    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`;
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
      setErro(err.response?.data?.erro || "Erro ao carregar itens.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, field, search]);

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeleteLoading(true);
      setErro("");

      await api.delete(`/items/${itemToDelete.id}`);
      setDeleteLoading(false);
      closeDeleteModal();
      loadItems();
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao deletar item.");
      setDeleteLoading(false);
    }
  };

  return (
    <div className="theme-page">
      <DeleteItemModal
        isOpen={deleteModalOpen}
        itemName={itemToDelete?.nome || ""}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />

      <div className="theme-container">
        <div className="mb-8 rounded-[2rem] theme-surface-strong p-5 md:p-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
                Gerenciador de Itens
              </h1>
              <p className="mt-1" style={{ color: "var(--text-soft)" }}>
                Explore os itens, filtre por nome e organize por preço mínimo ou máximo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_auto_auto_auto] gap-3">
              <input
                type="text"
                placeholder="Buscar por nome do item..."
                className="w-full rounded-2xl px-4 py-3 outline-none shadow-sm theme-input focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() =>
                  setField(field === "preco_minimo" ? "preco_maximo" : "preco_minimo")
                }
                className="rounded-2xl px-4 py-3 font-semibold shadow-md transition hover:scale-[1.02]"
                style={{ background: "var(--secondary)", color: "#ffffff" }}
              >
                Campo: {field === "preco_minimo" ? "Mínimo" : "Máximo"}
              </button>

              <button
                onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                className="rounded-2xl px-4 py-3 font-semibold shadow-md transition hover:scale-[1.02]"
                style={{ background: "var(--success)", color: "#ffffff" }}
              >
                Ordem: {order === "asc" ? "Crescente" : "Decrescente"}
              </button>

              <Link
                to="/novo"
                className="rounded-2xl px-4 py-3 font-semibold shadow-md transition hover:scale-[1.02] text-center"
                style={{ background: "var(--primary)", color: "#ffffff" }}
              >
                + Novo Item
              </Link>
            </div>
          </div>
        </div>

        {erro && (
          <div
            className="mb-6 rounded-2xl px-4 py-3 border"
            style={{
              background: "rgba(211,93,93,0.12)",
              color: "var(--danger)",
              borderColor: "rgba(211,93,93,0.35)"
            }}
          >
            {erro}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-72 rounded-3xl animate-pulse theme-surface"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[2rem] theme-surface-strong p-10 text-center">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-main)" }}>
              Nenhum item encontrado
            </h2>
            <p style={{ color: "var(--text-soft)" }}>
              Tente mudar a busca ou cadastre um novo item.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group rounded-[1.75rem] overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-2xl theme-surface"
              >
                <div className="relative aspect-square theme-item-image-bg flex items-center justify-center overflow-hidden">
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
                      className="inline-block text-white text-xs md:text-sm font-bold leading-tight transition hover:text-cyan-300"
                    >
                      {item.nome}
                    </Link>
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div
                      className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold border"
                      style={{
                        background: "var(--surface-strong)",
                        color: "var(--text-main)",
                        borderColor: "var(--border)"
                      }}
                    >
                      {item.pais}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] md:text-xs font-bold"
                        style={{
                          background: "rgba(46,158,132,0.12)",
                          color: "var(--success)",
                          border: "1px solid rgba(46,158,132,0.28)"
                        }}
                      >
                        Min ${formatPrice(item.preco_minimo)}
                      </span>

                      <span
                        className="px-3 py-1 rounded-full text-[11px] md:text-xs font-bold"
                        style={{
                          background: "rgba(211,93,93,0.12)",
                          color: "var(--danger)",
                          border: "1px solid rgba(211,93,93,0.28)"
                        }}
                      >
                        Max ${formatPrice(item.preco_maximo)}
                      </span>
                    </div>

                    <p className="text-[11px] md:text-xs font-semibold" style={{ color: "var(--text-soft)" }}>
                      Preço:
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 p-3 pt-0">
                  <Link
                    to={`/edit/${item.id}`}
                    className="w-1/2 text-center py-3 rounded-2xl font-bold shadow-md transition hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #f2b94b 0%, #d89213 100%)",
                      color: "#ffffff"
                    }}
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => openDeleteModal(item)}
                    className="w-1/2 py-3 rounded-2xl font-bold shadow-md transition hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #e26b6b 0%, #c44848 100%)",
                      color: "#ffffff"
                    }}
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

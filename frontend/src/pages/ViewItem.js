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
      <div className="theme-page">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
          <div className="h-[520px] rounded-[2rem] animate-pulse theme-surface-strong" />
        </div>
      </div>
    );
  }

  if (erro || !item) {
    return (
      <div className="theme-page">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
          <div className="rounded-[2rem] theme-surface-strong p-10 text-center">
            <h1 className="text-3xl font-black mb-3" style={{ color: "var(--text-main)" }}>
              Item não encontrado
            </h1>
            <p className="mb-6" style={{ color: "var(--text-soft)" }}>
              {erro || "Não foi possível localizar este item."}
            </p>
            <button
              onClick={() => navigate("/manager")}
              className="theme-btn theme-btn-primary rounded-2xl px-5 py-3 font-semibold"
            >
              Voltar para o Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-page">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="rounded-[2rem] overflow-hidden theme-surface-strong">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[380px] md:min-h-[540px] theme-item-image-bg flex items-center justify-center overflow-hidden">
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
                  className="relative z-10 max-w-[88%] max-h-[88%] object-contain"
                  style={{ filter: "drop-shadow(0 14px 16px rgba(0,0,0,0.18))" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-5 py-5">
                <p className="text-white/80 text-sm font-semibold mb-1">{item.pais}</p>
                <h1 className="text-white text-2xl md:text-4xl font-black">
                  {item.nome}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background: "var(--surface-strong)",
                    color: "var(--text-main)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {item.pais}
                </span>

                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background: "var(--surface-strong)",
                    color: "var(--text-main)",
                    border: "1px solid var(--border)"
                  }}
                >
                  ID #{item.id}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest mb-1" style={{ color: "var(--text-soft)" }}>
                    Nome
                  </p>
                  <p className="text-2xl font-black" style={{ color: "var(--text-main)" }}>
                    {item.nome}
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest mb-1" style={{ color: "var(--text-soft)" }}>
                    Descrição
                  </p>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-main)" }}>
                    {item.descricao || "Sem descrição cadastrada."}
                  </p>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "var(--text-soft)" }}>
                    Preço
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div
                      className="rounded-3xl px-5 py-4 shadow-sm"
                      style={{
                        background: "rgba(46,158,132,0.12)",
                        border: "1px solid rgba(46,158,132,0.25)"
                      }}
                    >
                      <p className="text-sm mb-1" style={{ color: "var(--success)" }}>
                        Min
                      </p>
                      <p className="text-2xl font-black" style={{ color: "var(--success)" }}>
                        ${formatPrice(item.preco_minimo)}
                      </p>
                    </div>

                    <div
                      className="rounded-3xl px-5 py-4 shadow-sm"
                      style={{
                        background: "rgba(211,93,93,0.12)",
                        border: "1px solid rgba(211,93,93,0.25)"
                      }}
                    >
                      <p className="text-sm mb-1" style={{ color: "var(--danger)" }}>
                        Max
                      </p>
                      <p className="text-2xl font-black" style={{ color: "var(--danger)" }}>
                        ${formatPrice(item.preco_maximo)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={`/edit/${item.id}`}
                  className="theme-btn theme-btn-warning-outline rounded-2xl px-5 py-3 font-bold"
                >
                  Editar item
                </Link>

                <button
                  onClick={() => navigate("/manager")}
                  className="theme-btn theme-btn-outline rounded-2xl px-5 py-3 font-semibold"
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

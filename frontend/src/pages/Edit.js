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
        .catch((err) => {
          setErro(err.response?.data?.erro || "Erro ao carregar item.");
        });
    }
  }, [id]);

  const isValidUrl = (value) => {
    if (!value || typeof value !== "string") return false;

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  const validateForm = () => {
    if (!form.foto || form.foto.trim() === "") {
      return "A URL da imagem é obrigatória.";
    }

    if (!isValidUrl(form.foto)) {
      return "A URL da imagem é inválida. Use um link começando com http:// ou https://";
    }

    if (form.foto.trim().length > 500) {
      return "A URL da imagem está muito longa. Use no máximo 500 caracteres.";
    }

    if (!form.pais) {
      return "Selecione um país.";
    }

    if (!countries.includes(form.pais)) {
      return "O país selecionado é inválido.";
    }

    if (!form.nome || form.nome.trim() === "") {
      return "O nome do item é obrigatório.";
    }

    if (form.nome.trim().length < 2) {
      return "O nome deve ter pelo menos 2 caracteres.";
    }

    if (form.nome.trim().length > 150) {
      return "O nome está muito longo. Use no máximo 150 caracteres.";
    }

    if (form.descricao && form.descricao.length > 5000) {
      return "A descrição está muito longa. Use no máximo 5000 caracteres.";
    }

    if (form.preco_minimo === "" || isNaN(Number(form.preco_minimo))) {
      return "O preço mínimo deve ser um número válido.";
    }

    if (form.preco_maximo === "" || isNaN(Number(form.preco_maximo))) {
      return "O preço máximo deve ser um número válido.";
    }

    if (Number(form.preco_minimo) <= 0) {
      return "O preço mínimo deve ser maior que zero.";
    }

    if (Number(form.preco_maximo) <= 0) {
      return "O preço máximo deve ser maior que zero.";
    }

    if (Number(form.preco_maximo) < Number(form.preco_minimo)) {
      return "O preço máximo não pode ser menor que o preço mínimo.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const validationError = validateForm();
    if (validationError) {
      setErro(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        foto: form.foto.trim(),
        pais: form.pais,
        nome: form.nome.trim(),
        descricao: form.descricao ? form.descricao.trim() : "",
        preco_minimo: Number(form.preco_minimo),
        preco_maximo: Number(form.preco_maximo)
      };

      if (id) {
        await api.put(`/items/${id}`, payload);
      } else {
        await api.post("/items", payload);
      }

      navigate("/manager");
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível salvar o item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-page">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="rounded-[2rem] theme-surface-strong overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              className="relative min-h-[320px] lg:min-h-full flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)"
              }}
            >
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
                  <h2 className="text-3xl font-black" style={{ color: "var(--text-main)" }}>
                    {id ? "Editar Item" : "Cadastrar Item"}
                  </h2>
                  <p className="mt-1" style={{ color: "var(--text-soft)" }}>
                    Preencha os dados corretamente para evitar erros no cadastro.
                  </p>
                </div>

                <Link
                  to="/manager"
                  className="theme-btn theme-btn-outline hidden md:inline-flex px-4 py-2 font-semibold"
                >
                  Voltar
                </Link>
              </div>

              {erro && (
                <div
                  className="mb-5 rounded-2xl px-4 py-3 border"
                  style={{
                    background: "rgba(211,93,93,0.12)",
                    color: "var(--danger)",
                    borderColor: "rgba(211,93,93,0.35)"
                  }}
                >
                  {erro}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                      Imagem (URL)
                    </label>
                    <input
                      className="w-full p-3 rounded-2xl outline-none theme-input focus:ring-2 focus:ring-blue-500"
                      value={form.foto}
                      onChange={(e) => setForm({ ...form, foto: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                      País
                    </label>
                    <select
                      className="w-full p-3 rounded-2xl outline-none theme-input focus:ring-2 focus:ring-blue-500"
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
                    <label className="block mb-2 text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                      Nome
                    </label>
                    <input
                      className="w-full p-3 rounded-2xl outline-none theme-input focus:ring-2 focus:ring-blue-500"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                      Descrição
                    </label>
                    <input
                      className="w-full p-3 rounded-2xl outline-none theme-input focus:ring-2 focus:ring-blue-500"
                      value={form.descricao}
                      onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                      Preço Mínimo
                    </label>
                    <input
                      className="w-full p-3 rounded-2xl outline-none theme-input focus:ring-2 focus:ring-blue-500"
                      value={form.preco_minimo}
                      onChange={(e) => setForm({ ...form, preco_minimo: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                      Preço Máximo
                    </label>
                    <input
                      className="w-full p-3 rounded-2xl outline-none theme-input focus:ring-2 focus:ring-blue-500"
                      value={form.preco_maximo}
                      onChange={(e) => setForm({ ...form, preco_maximo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="theme-btn theme-btn-primary px-6 py-3 rounded-2xl font-bold shadow-lg"
                    style={{ opacity: loading ? 0.75 : 1 }}
                  >
                    {loading ? "Salvando..." : "Salvar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/manager")}
                    className="theme-btn theme-btn-outline px-6 py-3 rounded-2xl font-bold"
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

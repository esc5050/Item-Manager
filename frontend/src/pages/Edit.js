import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

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

  // CARREGAR ITEM (EDIÇÃO)
  useEffect(() => {
    if (id) {
      api.get(`/items/${id}`)
        .then(res => setForm(res.data))
        .catch(() => setErro("Erro ao carregar item"));
    }
  }, [id]);

  // SUBMIT
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
      if (id) {
        await api.put(`/items/${id}`, form);
      } else {
        await api.post("/items", form);
      }

      navigate("/manager");

    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao salvar item");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      <h1 className="text-2xl font-bold mb-4">
        {id ? "Editar Item" : "Novo Item"}
      </h1>

      {erro && (
        <p className="text-red-500 mb-4">
          {erro}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-6">

        {/* FOTO + PAÍS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-1">Imagem (URL)</label>
            <input
              className="w-full border p-2 rounded bg-white dark:bg-gray-700"
              value={form.foto}
              onChange={e => setForm({ ...form, foto: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block mb-1">País</label>
            <select
              className="w-full border p-2 rounded bg-white dark:bg-gray-700"
              value={form.pais}
              onChange={e => setForm({ ...form, pais: e.target.value })}
            >
              <option value="">Selecione</option>
              {countries.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* NOME + DESCRIÇÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-1">Nome</label>
            <input
              className="w-full border p-2 rounded bg-white dark:bg-gray-700"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1">Descrição</label>
            <input
              className="w-full border p-2 rounded bg-white dark:bg-gray-700"
              value={form.descricao}
              onChange={e => setForm({ ...form, descricao: e.target.value })}
            />
          </div>

        </div>

        {/* PREÇOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-1">Preço Mínimo</label>
            <input
              className="w-full border p-2 rounded bg-white dark:bg-gray-700"
              value={form.preco_minimo}
              onChange={e => setForm({ ...form, preco_minimo: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1">Preço Máximo</label>
            <input
              className="w-full border p-2 rounded bg-white dark:bg-gray-700"
              value={form.preco_maximo}
              onChange={e => setForm({ ...form, preco_maximo: e.target.value })}
            />
          </div>

        </div>

        {/* BOTÃO */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Salvar
        </button>

      </form>
    </div>
  );
}

export default Edit;

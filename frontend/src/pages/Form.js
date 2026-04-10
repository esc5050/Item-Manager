import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function Form() {
  const [form, setForm] = useState({
    foto: "",
    pais: "",
    nome: "",
    descricao: "",
    preco_minimo: "",
    preco_maximo: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/items/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await api.put(`/items/${id}`, form);
    } else {
      await api.post("/items", form);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Foto" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} />
      <input placeholder="Nação" value={form.pais} onChange={e => setForm({...form, pais: e.target.value})} />
      <input placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
      <input placeholder="Descrição" value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
      <input placeholder="Preço mínimo" value={form.preco_minimo} onChange={e => setForm({...form, preco_minimo: e.target.value})} />
      <input placeholder="Preço máximo" value={form.preco_maximo} onChange={e => setForm({...form, preco_maximo: e.target.value})} />

      <button type="submit">Salvar</button>
    </form>
  );
}

export default Form;

import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    foto: "",
    pais: "",
    nome: "",
    descricao: "",
    preco_minimo: "",
    preco_maximo: ""
  });

  const [editId, setEditId] = useState(null);

  const loadItems = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/items/${editId}`, form);
    } else {
      await api.post("/items", form);
    }

    setForm({
      foto: "",
      pais: "",
      nome: "",
      descricao: "",
      preco_minimo: "",
      preco_maximo: ""
    });

    setEditId(null);
    loadItems();
  };

  const handleDelete = async (id) => {
    await api.delete(`/items/${id}`);
    loadItems();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Item Manager</h1>
      <h3>Gustavo Lona Grespan</h3>

      <form onSubmit={handleSubmit}>
        <input placeholder="Foto URL" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} />
        <input placeholder="País" value={form.pais} onChange={e => setForm({...form, pais: e.target.value})} />
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
        <input placeholder="Descrição" value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
        <input placeholder="Preço mínimo" value={form.preco_minimo} onChange={e => setForm({...form, preco_minimo: e.target.value})} />
        <input placeholder="Preço máximo" value={form.preco_maximo} onChange={e => setForm({...form, preco_maximo: e.target.value})} />

        <button type="submit">
          {editId ? "Atualizar" : "Criar"}
        </button>
      </form>

      <hr />

      {items.map(item => (
        <div key={item.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <img src={item.foto} alt="" width={150} />
          <h3>{item.nome}</h3>
          <p>{item.pais}</p>
          <p>{item.descricao}</p>
          <p>Preço: {item.preco_minimo} - {item.preco_maximo}</p>

          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}

export default Home;

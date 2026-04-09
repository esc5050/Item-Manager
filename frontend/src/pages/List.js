import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function List() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/items/${id}`);
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <Link to="/novo">➕ Novo Item</Link>

      {items.map(item => (
        <div key={item.id}>
          <img src={item.foto} width={150} alt="" />
          <h3>{item.nome}</h3>

          <Link to={`/item/${item.id}`}>Ver</Link>
          <Link to={`/editar/${item.id}`}>Editar</Link>
          <button onClick={() => handleDelete(item.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}

export default List;

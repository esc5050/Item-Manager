import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

function Detail() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api.get(`/items/${id}`).then(res => setItem(res.data));
  }, [id]);

  return (
    <div>
      <img src={item.foto} width={200} alt="" />
      <h2>{item.nome}</h2>
      <p>{item.pais}</p>
      <p>{item.descricao}</p>
      <p>{item.preco_minimo} - {item.preco_maximo}</p>
    </div>
  );
}

export default Detail;

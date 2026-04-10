const db = require("../config/db");

const ALLOWED_COUNTRIES = [
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

const isValidId = (value) => {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
};

const isValidNumber = (value) => {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(Number(value));
};

const isValidUrl = (value) => {
  if (!value || typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
};

const validateItemData = ({
  foto,
  pais,
  nome,
  descricao,
  preco_minimo,
  preco_maximo
}) => {
  if (!foto || String(foto).trim() === "") {
    return "A URL da imagem é obrigatória.";
  }

  if (!isValidUrl(foto)) {
    return "A URL da imagem é inválida. Use um link começando com http:// ou https://";
  }

  if (String(foto).trim().length > 500) {
    return "A URL da imagem está muito longa. Use no máximo 500 caracteres.";
  }

  if (!pais || String(pais).trim() === "") {
    return "A nação é obrigatória.";
  }

  if (!ALLOWED_COUNTRIES.includes(pais)) {
    return "A nação selecionada é inválida.";
  }

  if (!nome || String(nome).trim() === "") {
    return "O nome do item é obrigatório.";
  }

  if (String(nome).trim().length < 2) {
    return "O nome deve ter pelo menos 2 caracteres.";
  }

  if (String(nome).trim().length > 150) {
    return "O nome está muito longo. Use no máximo 150 caracteres.";
  }

  if (descricao && String(descricao).length > 5000) {
    return "A descrição está muito longa. Use no máximo 5000 caracteres.";
  }

  if (!isValidNumber(preco_minimo)) {
    return "O preço mínimo deve ser um número válido.";
  }

  if (!isValidNumber(preco_maximo)) {
    return "O preço máximo deve ser um número válido.";
  }

  const precoMin = Number(preco_minimo);
  const precoMax = Number(preco_maximo);

  if (precoMin <= 0) {
    return "O preço mínimo deve ser maior que zero.";
  }

  if (precoMax <= 0) {
    return "O preço máximo deve ser maior que zero.";
  }

  if (precoMax < precoMin) {
    return "O preço máximo não pode ser menor que o preço mínimo.";
  }

  return null;
};

// GET TODOS
exports.getItems = (req, res) => {
  db.query("SELECT * FROM items ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("Erro ao listar itens:", err);
      return res.status(500).json({
        erro: "Não foi possível listar os itens no momento."
      });
    }

    res.json(results);
  });
};

// GET POR ID
exports.getItemById = (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({
      erro: "O ID informado é inválido."
    });
  }

  db.query("SELECT * FROM items WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar item:", err);
      return res.status(500).json({
        erro: "Não foi possível buscar o item no momento."
      });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({
        erro: "O item solicitado não foi encontrado."
      });
    }

    res.json(results[0]);
  });
};

// CREATE
exports.createItem = (req, res) => {
  const { foto, pais, nome, descricao, preco_minimo, preco_maximo } = req.body;

  const validationError = validateItemData({
    foto,
    pais,
    nome,
    descricao,
    preco_minimo,
    preco_maximo
  });

  if (validationError) {
    return res.status(400).json({
      erro: validationError
    });
  }

  const sql = `
    INSERT INTO items (foto, pais, nome, descricao, preco_minimo, preco_maximo)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      String(foto).trim(),
      pais,
      String(nome).trim(),
      descricao ? String(descricao).trim() : "",
      Number(preco_minimo),
      Number(preco_maximo)
    ],
    (err, result) => {
      if (err) {
        console.error("Erro ao criar item:", err);
        return res.status(500).json({
          erro: "Não foi possível criar o item no momento."
        });
      }

      res.status(201).json({
        mensagem: "Item criado com sucesso!",
        id: result.insertId
      });
    }
  );
};

// UPDATE
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { foto, pais, nome, descricao, preco_minimo, preco_maximo } = req.body;

  if (!isValidId(id)) {
    return res.status(400).json({
      erro: "O ID informado é inválido."
    });
  }

  const validationError = validateItemData({
    foto,
    pais,
    nome,
    descricao,
    preco_minimo,
    preco_maximo
  });

  if (validationError) {
    return res.status(400).json({
      erro: validationError
    });
  }

  db.query("SELECT id FROM items WHERE id = ?", [id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Erro ao verificar item para atualização:", checkErr);
      return res.status(500).json({
        erro: "Não foi possível validar o item antes da atualização."
      });
    }

    if (!checkResults || checkResults.length === 0) {
      return res.status(404).json({
        erro: "O item que você tentou editar não existe."
      });
    }

    const sql = `
      UPDATE items
      SET foto = ?, pais = ?, nome = ?, descricao = ?, preco_minimo = ?, preco_maximo = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        String(foto).trim(),
        pais,
        String(nome).trim(),
        descricao ? String(descricao).trim() : "",
        Number(preco_minimo),
        Number(preco_maximo),
        Number(id)
      ],
      (err) => {
        if (err) {
          console.error("Erro ao atualizar item:", err);
          return res.status(500).json({
            erro: "Não foi possível atualizar o item no momento."
          });
        }

        res.json({
          mensagem: "Item atualizado com sucesso!"
        });
      }
    );
  });
};

// DELETE
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({
      erro: "O ID informado é inválido."
    });
  }

  db.query("SELECT id FROM items WHERE id = ?", [id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Erro ao verificar item para exclusão:", checkErr);
      return res.status(500).json({
        erro: "Não foi possível validar o item antes da exclusão."
      });
    }

    if (!checkResults || checkResults.length === 0) {
      return res.status(404).json({
        erro: "O item que você tentou deletar não existe."
      });
    }

    db.query("DELETE FROM items WHERE id = ?", [id], (err) => {
      if (err) {
        console.error("Erro ao deletar item:", err);
        return res.status(500).json({
          erro: "Não foi possível deletar o item no momento."
        });
      }

      res.json({
        mensagem: "Item deletado com sucesso!"
      });
    });
  });
};

const db = require("../config/db");

const isNumber = (value) => !isNaN(value);

// GET TODOS
exports.getItems = (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro no servidor" });
    res.json(results);
  });
};

// GET POR ID
exports.getItemById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM items WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro no servidor" });
    res.json(results[0]);
  });
};

// CREATE
exports.createItem = (req, res) => {
  const { foto, pais, nome, descricao, preco_minimo, preco_maximo } = req.body;

  if (!foto || !pais || !nome || !preco_minimo || !preco_maximo) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando" });
  }

  if (!isNaN(preco_minimo) === false || !isNaN(preco_maximo) === false) {
    return res.status(400).json({ erro: "Preços devem ser números" });
  }

  const sql = `
    INSERT INTO items (foto, pais, nome, descricao, preco_minimo, preco_maximo)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [foto, pais, nome, descricao, preco_minimo, preco_maximo], (err) => {
    if (err) return res.status(500).json({ erro: "Erro no servidor" });
    res.json({ mensagem: "Item criado com sucesso!" });
  });
};

// UPDATE
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { foto, pais, nome, descricao, preco_minimo, preco_maximo } = req.body;

  if (!isNumber(preco_minimo) || !isNumber(preco_maximo)) {
    return res.status(400).json({ erro: "Preços inválidos" });
  }

  const sql = `
    UPDATE items
    SET foto=?, pais=?, nome=?, descricao=?, preco_minimo=?, preco_maximo=?
    WHERE id=?
  `;

  db.query(sql, [foto, pais, nome, descricao, preco_minimo, preco_maximo, id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao atualizar" });
    res.json({ mensagem: "Item atualizado!" });
  });
};

// DELETE
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM items WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao deletar" });
    res.json({ mensagem: "Item deletado!" });
  });
};

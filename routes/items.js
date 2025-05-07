const express = require('express');
const router = express.Router();

let items = []; // Armazenamento em memória

// GET /items - Lista todos os itens
router.get('/', (req, res) => {
  res.json(items);
});

// POST /items - Adiciona um novo item
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'O campo "name" é obrigatório.' });
  }
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;

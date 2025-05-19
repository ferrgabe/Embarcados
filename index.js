const express = require('express');
const ledRouter = require('./routes/led');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Usar as rotas definidas em routes/led.js
app.use('/led', ledRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

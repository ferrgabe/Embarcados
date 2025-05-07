const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Rota POST para controle do LED
app.post(
  '/led',
  [
    body('ON').isBoolean().withMessage('O campo ON deve ser booleano.'),
    body('RED').isInt({ min: 0, max: 255 }).withMessage('RED deve ser um inteiro entre 0 e 255.'),
    body('GREEN').isInt({ min: 0, max: 255 }).withMessage('GREEN deve ser um inteiro entre 0 e 255.'),
    body('BLUE').isInt({ min: 0, max: 255 }).withMessage('BLUE deve ser um inteiro entre 0 e 255.'),
    body('TYPE_1').isString().withMessage('TYPE_1 deve ser uma string.'),
    body('BEHAVIOR').isString().withMessage('BEHAVIOR deve ser uma string.')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Retorna erros de validação
      return res.status(400).json({ errors: errors.array() });
    }

    const { ON, RED, GREEN, BLUE, TYPE_1, BEHAVIOR } = req.body;

    // Aqui você pode adicionar a lógica para controlar o LED
    // Por exemplo, enviar comandos para um microcontrolador via serial, MQTT, etc.

    res.status(200).json({
      message: 'Comando recebido com sucesso.',
      data: { ON, RED, GREEN, BLUE, TYPE_1 }
    });
  }
);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

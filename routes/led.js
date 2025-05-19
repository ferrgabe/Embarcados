const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Rota POST para controle do LED
router.post(
  '/',
  [
    body('ON').isBoolean().withMessage('O campo ON deve ser booleano.'),
    body('RED').isBoolean().withMessage('O campo RED deve ser booleano.'),
    body('GREEN').isBoolean().withMessage('O campo GREEN deve ser booleano.'),
    body('BLUE').isBoolean().withMessage('O campo BLUE deve ser booleano.'),
    body('BEHAVIOR').isInt({ min: 1, max: 5 }).withMessage('BEHAVIOR deve ser um inteiro entre 1 e 5.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Retorna erros de validação
      return res.status(400).json({ errors: errors.array() });
    }

    const { ON, RED, GREEN, BLUE, BEHAVIOR } = req.body;

    // Aqui você pode adicionar a lógica para controlar o LED
    // Por exemplo, enviar comandos para um microcontrolador via serial, MQTT, etc.

    res.status(200).json({
      message: 'Comando recebido com sucesso.',
      data: { ON, RED, GREEN, BLUE, BEHAVIOR }
    });
  }
);

module.exports = router;

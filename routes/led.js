const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendLedCommand } = require('../services/esp8266Service');

const router = express.Router();

router.post(
  '/',
  [
    body('ON').isBoolean().withMessage('O campo ON deve ser booleano.'),
    body('RED').isBoolean().withMessage('O campo RED deve ser booleano.'),
    body('GREEN').isBoolean().withMessage('O campo GREEN deve ser booleano.'),
    body('BLUE').isBoolean().withMessage('O campo BLUE deve ser booleano.'),
    body('BEHAVIOR').isInt({ min: 0, max: 5 }).withMessage('BLUE deve ser um inteiro entre 0 e 5.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Retorna erros de validação
      return res.status(400).json({ errors: errors.array() });
    }

    const command = req.body;

    try {
      const espResponse = await sendLedCommand(command);
      res.status(200).json({
        message: 'Comando enviado ao ESP8266 com sucesso.',
        espResponse
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;

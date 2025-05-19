const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendLedCommand } = require('../services/esp8266Service');

const router = express.Router();

router.post(
  '/',
  [
    body('ON').isBoolean().withMessage('O campo ON deve ser booleano.'),
    body('RED').isInt({ min: 0, max: 255 }).withMessage('RED deve ser um inteiro entre 0 e 255.'),
    body('GREEN').isInt({ min: 0, max: 255 }).withMessage('GREEN deve ser um inteiro entre 0 e 255.'),
    body('BLUE').isInt({ min: 0, max: 255 }).withMessage('BLUE deve ser um inteiro entre 0 e 255.'),
    body('BEHAVIOR').isString().withMessage('BEHAVIOR deve ser uma string.')
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

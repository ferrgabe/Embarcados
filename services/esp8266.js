const axios = require('axios');

const ESP8266_IP = 'http://IP_DO_ESP8266'; // Substitua pelo IP real do seu ESP8266

const sendLedCommand = async (command) => {
  try {
    const response = await axios.post(`${ESP8266_IP}/led`, command);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao enviar comando para o ESP8266: ${error.message}`);
  }
};

module.exports = { sendLedCommand };

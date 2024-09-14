// server/utils/logger.js
require('dotenv').config();

const logsEnabled = process.env.LOGS_ENABLED === 'true'; // Sprawdzenie, czy logi są włączone

const log = (...args) => {
  if (logsEnabled) {
    console.log(...args);
  }
};

module.exports = log;

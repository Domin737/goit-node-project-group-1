// src/utils/logger.js
const logsEnabled = process.env.LOGS_ENABLED === 'true'; // Można to kontrolować również za pomocą zmiennej środowiskowej w Parcelu

const log = (...args) => {
  if (logsEnabled) {
    console.log(...args);
  }
};

export default log;

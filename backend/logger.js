// ---------------------------------------------------------------------------
// Structured (JSON) Logger for Drishti Wealth Backend
// Outputs single-line JSON formatted logs for Easy Parsing & SIEM / CloudWatch / Datadog
// ---------------------------------------------------------------------------

function formatLog(level, message, meta = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    message: message,
    ...meta
  };
  return JSON.stringify(logEntry);
}

const logger = {
  info: (message, meta = {}) => {
    console.log(formatLog('info', message, meta));
  },
  warn: (message, meta = {}) => {
    console.warn(formatLog('warn', message, meta));
  },
  error: (message, meta = {}) => {
    console.error(formatLog('error', message, meta));
  },
  alert: (alertType, message, meta = {}) => {
    console.error(formatLog('alert', `[ALERT] ${message}`, { alert_type: alertType, ...meta }));
  }
};

module.exports = logger;

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'employee-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log/combined.log', level: 'debug' }),
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
  ],
});

module.exports = logger;
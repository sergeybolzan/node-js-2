const morgan = require('morgan');
const { LOGS_DIR } = require('./config');
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, prettyPrint, cli } = format;

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({ filename: `${LOGS_DIR}/error.log`, level: 'error' }),
    new transports.File({ filename: `${LOGS_DIR}/info.log`, level: 'info' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${LOGS_DIR}/exceptions.log` })
  ],
  rejectionHandlers: [
    new transports.File({ filename: `${LOGS_DIR}/exceptions.log` })
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: cli(),
      handleExceptions: true
    })
  );
}

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;

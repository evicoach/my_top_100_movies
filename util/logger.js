const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'warn',
      filename: 'logsWarning.log'
    }),
    new transports.File({
      level: 'error',
      filename: 'errorsWarning.log'
    }),
    // new transports.MongoDB({
    //     db: dbUrl,
    //     collection: 'logs'
    // })
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.metadata(),
    format.prettyPrint()
  ),
});

module.exports = logger;
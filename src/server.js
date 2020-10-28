const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./common/logging');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', () => logger.error('connection error:'));
db.once('open', () => {
  logger.info("we're connected!");
  db.dropDatabase();

  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});

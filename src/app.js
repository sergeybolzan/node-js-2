const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
require('express-async-errors');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const morgan = require('morgan');
const logger = require('./common/logging');
const errorHandler = require('./errors/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(':method :status :url Query: :query Body: :body', {
    stream: logger.stream
  })
);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

module.exports = app;

const express = require('express');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(usersRouter);
  app.use(postsRouter);

  return app;
};

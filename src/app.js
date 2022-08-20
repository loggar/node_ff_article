const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');

const articlesRouter = require('./routes/articles.api');
const tagsRouter = require('./routes/tags.api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/articles', articlesRouter);
app.use('/tags', tagsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

module.exports = app;

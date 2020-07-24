// ./bin/www to start server

require('getmodule');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors')
var mysql = require('mysql')
myConnection = require('express-myconnection'),
  dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'Root_password_1234',
    port: 3306,
    database: 'presentation'
  };

var indexRouter = require('./routes/index');
var apisRouter = require('./routes/apis');
var descriptionsRouter = require('./routes/descriptions');
var dataRouter = require('./routes/data');

var corsOptions = {
  origin: [
    'http://192.168.0.30:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3000',
    'localhost:3000'
  ],
  optionsSuccessStatus: 200
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(myConnection(mysql, dbOptions, 'single'));


app.use('/', indexRouter);
app.use('/apis', apisRouter);
app.use('/descriptions', descriptionsRouter);
app.use('/data', dataRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

require('dotenv').config();

var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var history = require('connect-history-api-fallback');


const MONGO_DB = process.env['MONGO_DB'];

var app = express();

app.set('view engine', 'json');
app.use(history());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(bodyParser.json({ limit: '1mb'}));

app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
console.log(`[mongodb] ${MONGO_DB}`);
mongoose.connect(MONGO_DB)
  .then(() =>  console.log('[mongodb] connection successful'))
  .catch((err) => console.log(err));

const user = require('./routes/user');
const click = require('./routes/click');
const game = require('./routes/game');

app.use('/api/users', user);
app.use('/api/clicks', click);
app.use('/api/games', game);

app.use(express.static('frontend/dist'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status || 500).send('error')
});

module.exports = app;

var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const express=require("express");

const mongo=require('./shared/connection');

const cors=require('cors')
// const user=require('./routes/movies')
const registerRouter=require('./routes/register')
const userRouter=require('./routes/user')

const authorize=require('./module/authorize')

const movieRouter=require('./routes/movie')




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const port=process.env.PORT || 3001
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(express.json())
// console.log(mongo)
 mongo.connect()

 app.use(cors())
//  app.use('/user',user)
 app.use('/register',registerRouter)

 app.use(authorize.Authorize)
//  app.use(authorize.isadmin)
app.use('/user',userRouter)
app.use('/movie',movieRouter)

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
  res.render('error');


  
});

module.exports = app;

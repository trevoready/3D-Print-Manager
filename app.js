var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var index = require('./routes/index');
var filament = require('./routes/filament');
var files = require('./routes/files');
var prints = require('./routes/prints');
var printers = require('./routes/printers');
var jobs = require('./routes/jobs');
var session = require('express-session')
var app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'Change This',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use('/files/upload',fileUpload({
  useTempFiles : true,
  tempFileDir : path.join(__dirname, 'uploads'),
  debug:true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/prints', prints);
app.use('/filament', filament);
app.use('/files', files);
app.use('/jobs', jobs);
app.use('/printers', printers);
app.use('/', index);

// Make files dir if not exists
if (!fs.existsSync('./files')){
  fs.mkdirSync('./files');
  console.log('Made files Folder')
}
// Make uploads dir if not exists
if (!fs.existsSync('./uploads')){
  fs.mkdirSync('./uploads');
  console.log('Made Uploads Folder')
}

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

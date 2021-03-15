var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var pool = require('../mysql-helper/mysql.js').pool;

//All Jobs
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jobs' });
});
router.get('/add', function(req, res, next) {
  pool.query('SELECT * FROM files', function (error, resultsFiles, fields) {
    if (error) console.log(error);
    pool.query('SELECT * FROM orders', function (error, resultsOrders, fields) {
      if (error) console.log(error);
      pool.query('SELECT * FROM filament', function (error, resultsFilament, fields) {
        if (error) console.log(error);
        res.render('add-job', { files: resultsFiles,orders: resultsOrders,filaments: resultsFilament,uid:uid.sync(8)});
      })
    })
  })
});
router.post('/new', function(req, res, next) {
  console.log(req.body)
  if(req.body.fileID == ''){
    return res.redirect('/jobs/add')
  }
  var form = req.body
  pool.query('SELECT * FROM files WHERE ID=?',[form.fileID], function (error, results, fields) {
    pool.query('INSERT INTO jobs (barcode,fileID,filamentID,estPrintTime,orderID) VALUES(?,?,?,?,?)',[form.jobCode,form.fileID,form.filamentID,results[0].time,form.orderID], function (error, results, fields) {
      if (error) console.log(error);
      res.redirect('/jobs')
    })
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var pool = require('../mysql-helper/mysql.js').pool;

//All Jobs
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jobs' });
});
router.get('/add', function(req, res, next) {
  pool.query('SELECT * FROM files', function (error, results, fields) {
    if (error) console.log(error);
    res.render('add-job', { files: results,uid:uid.sync(8)});
  })
});router.post('/new', function(req, res, next) {
  console.log(req.body)
  if(req.body.fileID == ''){
    return res.redirect('/jobs/add')
  }
  pool.query('SELECT * FROM files WHERE ID=?',[req.body.id], function (error, results, fields) {
    if (error) console.log(error);
    res.redirect('/jobs')
  })
});

module.exports = router;

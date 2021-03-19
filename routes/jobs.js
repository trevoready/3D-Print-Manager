var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var pool = require('../mysql-helper/mysql.js');

//All Jobs
router.get('/', function(req, res, next) {
  pool.query('SELECT jobs.jobCode,jobs.dateAdded,jobs.status,jobs.estPrintTime,filament.material,filament.color,files.name,files.filament FROM jobs LEFT JOIN filament ON jobs.filamentID = filament.ID LEFT JOIN files ON jobs.fileID = files.ID;', async function (error, jobs, fields) {
    if (error) console.log(error);
    res.render('jobs', { jobs: jobs});
  })
});
router.get('/add', async function(req, res, next) {
  const [resultsFiles, resultsOrders, resultsFilament] = await Promise.all([pool.query('SELECT * FROM files'), pool.query('SELECT * FROM orders'), pool.query('SELECT * FROM filament')]);
  res.render('add-job', { files: resultsFiles,orders: resultsOrders,filaments: resultsFilament,uid:uid.sync(8)});
});
router.post('/new', async function(req, res, next) {
  console.log(req.body)
  if(req.body.fileID == ''){
    return res.redirect('/jobs/add')
  }
  var form = req.body
  let fileData = await pool.query('SELECT * FROM files WHERE ID=?',[form.fileID])
  await pool.query('INSERT INTO jobs (jobCode,fileID,filamentID,estPrintTime,orderID) VALUES(?,?,?,?,?)',[form.jobCode,form.fileID,form.filamentID,fileData[0].time,form.orderID])
  res.redirect('/jobs')
});

module.exports = router;

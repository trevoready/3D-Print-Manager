var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var pool = require('../mysql-helper/mysql.js');
var printerCommands = require('../helpers/printerCommands')

//Printers
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Printers' });
});
router.get('command/:barcode/lowerBed', function(req, res, next) {
  printerCommands.lowerBed(req.params.barcode)
  res.sendStatus(200)
});
router.post('/webhook', async function(req, res, next) {
  console.log(req.body)
  if(req.body.topic == "Print Done"){
    console.log("test")
  }

  res.render('index', { title: 'Printers' });
});
module.exports = router;

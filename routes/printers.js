var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var pool = require('../mysql-helper/mysql.js');

//Printers
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Printers' });
});
router.post('/webhook', async function(req, res, next) {
  console.log(req.body)
  if(req.body.topic == "Print Done"){
    console.log("test")
    pool.query('SELECT * FROM printers WHERE ID=?',[req.body.deviceIdentifier]).then((results) =>{
      console.log(results)
    })
    const response = await fetch('http://your-device-url/api/version', {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'your key goes here'
      }
    });
    const json = await response.json();
    console.log('here is the version information', json);
  }

  res.render('index', { title: 'Printers' });
});
module.exports = router;

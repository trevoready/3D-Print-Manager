var express = require('express');
var router = express.Router();

//Printers
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Printers' });
});

module.exports = router;

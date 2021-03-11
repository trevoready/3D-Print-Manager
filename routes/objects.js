var express = require('express');
var router = express.Router();

//All Objects
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Objects' });
});

module.exports = router;

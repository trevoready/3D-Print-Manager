var express = require('express');
var router = express.Router();

//Current Print Jobs
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prints' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

//All Jobs
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jobs' });
});

module.exports = router;

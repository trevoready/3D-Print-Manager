var express = require('express');
var router = express.Router();

//All Objects
router.get('/', function(req, res, next) {
  res.render('files', { title: 'Files' });
});

module.exports = router;

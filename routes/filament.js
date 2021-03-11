var express = require('express');
var router = express.Router();

//Filament Rolls
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Filament' });
});

module.exports = router;

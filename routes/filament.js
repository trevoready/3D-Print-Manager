var express = require('express');
var router = express.Router();
var pool = require('../mysql-helper/mysql')
//Filament Rolls
router.get('/', async function(req, res, next) 
{
  let rolls = await pool.query('SELECT * FROM filament') 
  res.render('filament', { rolls: rolls });
});

module.exports = router;

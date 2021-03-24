var express = require('express');
var router = express.Router();
var pool = require('../mysql-helper/mysql')
//Filament Rolls
router.get('/', async function(req, res, next) 
{
  let rolls = await pool.query('SELECT * FROM filament') 
  res.render('filament', { rolls: rolls });
});
router.get('/add', async function(req, res, next) 
{ 
  let colors = await pool.query('SELECT * FROM colors') 
  let materials = await pool.query('SELECT * FROM materials') 
  let vendors = await pool.query('SELECT * FROM vendors') 
  res.render('add-filament',{vendors:vendors,materials:materials,colors:colors});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var pool = require('../mysql-helper/mysql')
    //Filament Rolls
router.get('/', async function(req, res, next) {
    let rolls = await pool.query('SELECT * FROM filament')
    res.render('filament', { rolls: rolls });
});
router.get('/add', async function(req, res, next) {
    let colors = await pool.query('SELECT * FROM colors')
    let materials = await pool.query('SELECT * FROM materials')
    let vendors = await pool.query('SELECT * FROM vendors')
    res.render('add-filament', { vendors: vendors, materials: materials, colors: colors });
});
router.post('/add', async function(req, res, next) {
    if (req.body.barcode) {
        let data = req.body;
        await pool.query('INSERT INTO filament (barcode,material,spoolAmount,amountRemaining,purchasePrice,color,purchaseDate,vendor) VALUES(?,?,?,?,?,?,?,?)', [data.barcode, data.material, data.amount, data.currentAmount, data.price, data.color, data.purchaseDate, data.vendor])
    }
    res.redirect('/filament');
});

module.exports = router;
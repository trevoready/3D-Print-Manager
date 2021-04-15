var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var path = require('path');
var pool = require('../mysql-helper/mysql.js');

//All Files
router.get('/', async function(req, res, next) {
    let orders = await pool.query('SELECT * FROM orders')
    res.render('orders', { orders: orders });
});
router.get('/add', async function(req, res, next) {
    let customers = await pool.query('SELECT * FROM customers')
    res.render('add_order', { customers: customers, uid: uid.sync(10) });
});
router.post('/new', async function(req, res, next) {
    console.log(req.body)
    res.redirect('/orders/')
});
module.exports = router;
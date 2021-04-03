var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var path = require('path');
var pool = require('../mysql-helper/mysql.js');
const { time } = require('console');

//All Files
router.get('/', function(req, res, next) {
    res.render('orders', { title: 'Files' });
});
router.get('/add', function(req, res, next) {
    res.render('add_order');
});

module.exports = router;
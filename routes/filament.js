var express = require('express');
var router = express.Router();
var pool = require('../mysql-helper/mysql')
var mongo = require('../mongo-helper/mongoconnect')
    //Filament Rolls
router.get('/', async function(req, res, next) {
    var db = await mongo.getClient()
    var rolls = await db.collection('rolls').find({}).toArray()
    res.render('filament', { rolls: rolls });
});
router.get('/add', async function(req, res, next) {
    res.render('add-filament');
});

module.exports = router;
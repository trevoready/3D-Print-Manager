var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var pool = require('../mysql-helper/mysql.js');
var mongo = require('../mongo-helper/mongoconnect')

//All Jobs
router.get('/', async function(req, res, next) {
    var db = await mongo.getClient()
    var jobs = await db.collection('jobs').find({}).toArray()
    res.render('jobs', { jobs: jobs });
});
router.get('/add', async function(req, res, next) {
    var db = await mongo.getClient()
    const [resultsOrders, resultsFilament] = await Promise.all([db.collection('orders').find({}).toArray(), db.collection('filament').find({}).toArray()]);
    res.render('add-job', { orders: resultsOrders, filaments: resultsFilament, uid: uid.sync(8) });
});
router.post('/new', async function(req, res, next) {
    console.log(req.body)
    if (req.body.fileID == '') {
        return res.redirect('/jobs/add')
    }
    var form = req.body
    let fileData = await pool.query('SELECT * FROM files WHERE ID=?', [form.fileID])
    await pool.query('INSERT INTO jobs (jobCode,fileID,filamentID,estPrintTime,orderID) VALUES(?,?,?,?,?)', [form.jobCode, form.fileID, form.filamentID, fileData[0].time, form.orderID])
    res.redirect('/jobs')
});
router.post('/status-update', async function(req, res, next) {
    console.log(req.body)
    await pool.query('UPDATE jobs SET status=? WHERE jobCode=?', [req.body.status, req.body.jobCode])
    res.json({ success: true })
});

module.exports = router;
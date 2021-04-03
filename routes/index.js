var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var pool = require('../mysql-helper/mysql.js').pool
var mongo = require('../mongo-helper/mongoconnect')
    //Login
router.get('/', function(req, res, next) {
    res.redirect('login');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.post('/login', async function(req, res, next) {
    var db = await mongo.getClient();
    if (req.body.username && req.body.password) {
        var user = await db.collection('users').findOne({ username: req.body.username })
        console.log(user)
        if (user == null) {
            //user dosent exist lets add them for nowusing the password provided
            var passcrypt = bcrypt.hashSync(req.body.password, 10)
            var insert = await db.collection("users").insertOne({ username: req.body.username, password: passcrypt })
        } else {
            if (user.password == null) {
                //user was already made and needs to set thier password
                var passcrypt = bcrypt.hashSync(req.body.password, 10)
                var query = { username: req.body.username };
                var passadd = { $set: { password: passcrypt } };
                db.collection("users").updateOne(query, passadd)
                res.json({ success: false, error: "Password Set" })
            } else {
                let success = bcrypt.compareSync(req.body.password, user.password)
                res.json({ success: success })
            }
        }
    } else {
        res.json({ success: false, error: "Empty Username Or Pass" })
    }
});

module.exports = router;
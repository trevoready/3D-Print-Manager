var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var pool = require('../mysql-helper/mysql.js').pool
//Login
router.get('/', function(req, res, next) {
  res.redirect('login');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next) {

  if(req.body.username && req.body.password){
    pool.query('SELECT * FROM users WHERE username=? LIMIT 1',[req.body.username], function (error, results, fields) {
      if (error) console.log(error);
      console.log('The solution is: ', results[0]);
      if(results[0].password == null){
        var passcrypt = bcrypt.hashSync(req.body.password,10)
        pool.query('UPDATE users SET password=? WHERE username=? LIMIT 1',[passcrypt,req.body.username], function (error, results, fields) {
          if (error) console.log(error);
        })
        res.json({success:false, error:"Password Set"})
      }else{
        let success = bcrypt.compareSync(req.body.password, results[0].password)
        res.json({success:success})
      }
    });
  }else{
    res.json({success:false, error:"Empty Username Or Pass"})
  }
});

module.exports = router;

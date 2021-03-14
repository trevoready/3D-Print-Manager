var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var path = require('path');
var pool = require('../mysql-helper/mysql.js').pool;
const { time } = require('console');

//All Files
router.get('/', function(req, res, next) {
  res.render('files', { title: 'Files' });
});
router.get('/add', function(req, res, next) {
    res.render('add_file');
});
router.post('/upload', function(req, res, next) {
  console.log(req.files)
  let sampleFile;
  let uploadPath;
  let name = req.body.name;
  let printTime = req.body.printTime;
  let filament = req.body.amount;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.file;
  fileName = sampleFile.name;
  fileData = fileName.split(".")
  newName = uid.sync(8) + '.' + fileData[1]
  uploadPath = path.join(__dirname, '../files/' + newName);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    pool.query('INSERT INTO files (name,fileName,time,filament) VALUES(?,?,?,?)',[name,newName,printTime,filament], function (error, results, fields) {
      if (error) console.log(error);
      res.redirect('add');
    })
  });
});

module.exports = router;
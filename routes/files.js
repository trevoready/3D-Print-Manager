var express = require('express');
var router = express.Router();
var uid = require('uid-safe')
var path = require('path');
var pool = require('../mysql-helper/mysql.js');
const sha1File = require("sha1-file");

//All Files
router.get('/', async function(req, res, next) {
    let files = await pool.query('SELECT * FROM files')
    res.render('files', { files: files });
});
router.get('/add', function(req, res, next) {
    res.render('add_file');
});
router.post('/upload', async function(req, res, next) {
    console.log(req.files)
    let uploadedFile;
    let uploadPath;
    let name = req.body.name;
    let printTime = req.body.printTime;
    let filament = req.body.amount;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    uploadedFile = req.files.file;
    fileName = uploadedFile.name;
    fileData = fileName.split(".")
    newName = uid.sync(8) + '.' + fileData[1]
    uploadPath = path.join(__dirname, '../files/' + newName);

    // Use the mv() method to place the file somewhere on your server
    uploadedFile.mv(uploadPath, async function(err) {
        if (err)
            return res.status(500).send(err);
        let hash = sha1File.sync(uploadPath);
        await pool.query('INSERT INTO files (name,fileName,time,filament,hash) VALUES(?,?,?,?,?)', [name, newName, printTime, filament, hash])
        res.redirect('add');
    });
});

module.exports = router;
var mysql = require('mysql');
var cfg = require('./mysql-cfg')
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : cfg.host,
  user            : cfg.username,
  password        : cfg.password,
  database        : cfg.db
});
exports.pool = pool
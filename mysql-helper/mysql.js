var mysql = require('mysql');
var cfg = require('./mysql-cfg')
const { promisify } = require('util')
var pool  = mysql.createPool({
  dateStrings     : true,
  connectionLimit : 10,
  host            : cfg.host,
  user            : cfg.username,
  password        : cfg.password,
  database        : cfg.db
});
exports.query = promisify(pool.query).bind(pool)
exports.pool = pool
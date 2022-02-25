const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "EEmercado@2003",
  database: "mydb"
});

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;

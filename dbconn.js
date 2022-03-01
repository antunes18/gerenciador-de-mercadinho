const mysql = require('mysql2');

// Database setup
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = conn;

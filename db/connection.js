const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'train_booking'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = db;

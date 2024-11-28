const db = require('../db/connection');

const getAllSeats = (callback) => {
  const query = 'SELECT * FROM seats ORDER BY row_no, seat_number';
  db.query(query, callback);
};

const bookSeats = (seatIds, callback) => {
  const query = `UPDATE seats SET is_reserved = 1 WHERE seat_id IN (${seatIds.join(',')})`;
  db.query(query, callback);
};

module.exports = { getAllSeats, bookSeats };

const { getAllSeats, bookSeats } = require('../models/seatModel');

const fetchSeats = (req, res) => {
  getAllSeats((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

const reserveSeats = (req, res) => {
  const { numSeats } = req.body;

  // Validate that the requested seats do not exceed 7
  if (numSeats > 7) {
    return res.status(400).json({ message: 'You can only reserve up to 7 seats at a time.' });
  }

  getAllSeats((err, seats) => {
    if (err) return res.status(500).send(err);

    // Filter available seats
    const availableSeats = seats.filter(seat => !seat.is_reserved);
    if (availableSeats.length < numSeats) {
      return res.status(400).json({ message: 'Not enough seats available.' });
    }

    // Group seats by row
    const seatGroups = availableSeats.reduce((acc, seat) => {
      if (!acc[seat.row_no]) acc[seat.row_no] = [];
      acc[seat.row_no].push(seat);
      return acc;
    }, {});

    let bookedSeats = [];
    for (let row in seatGroups) {
      if (seatGroups[row].length >= numSeats) {
        // Book seats in one row if enough are available
        bookedSeats = seatGroups[row].slice(0, numSeats);
        break;
      }
    }

    // If not enough seats in one row, pick the nearest available seats across rows
    if (bookedSeats.length === 0) {
      for (let row in seatGroups) {
        for (let seat of seatGroups[row]) {
          if (bookedSeats.length < numSeats) {
            bookedSeats.push(seat);
          } else {
            break;
          }
        }
        if (bookedSeats.length === numSeats) break;
      }
    }

    const seatIds = bookedSeats.map(seat => seat.seat_id);

    // Update the database with the booked seats
    bookSeats(seatIds, err => {
      if (err) return res.status(500).send(err);
      res.json({
        bookedSeats: bookedSeats.map(seat => ({
          seat_id: seat.seat_id,
          row_no: seat.row_no,
          seat_number: seat.seat_number
        }))
      });
    });
  });
};

module.exports = { fetchSeats, reserveSeats };

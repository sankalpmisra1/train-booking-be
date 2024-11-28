const express = require('express');
const { fetchSeats, reserveSeats } = require('../controllers/seatController');

const router = express.Router();

router.get('/seats', fetchSeats);
router.post('/book', reserveSeats);

module.exports = router;

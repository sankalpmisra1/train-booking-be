const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const seatRoutes = require('./routes/seatRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', seatRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

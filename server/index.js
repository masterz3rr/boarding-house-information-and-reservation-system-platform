const path = require('path');
require('dotenv').config({ path: __dirname + './../.env' });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const userRoute = require('./routes/auth');
const landlordRoute = require('./routes/landlord');

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', userRoute);
app.use('/api', landlordRoute);

require('./config/database.js');

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
});

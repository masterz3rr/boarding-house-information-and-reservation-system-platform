const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema(
	{
		dateToLive: {
			type: Date,
			required: [true, 'Please provide a date when you will stay!'],
		},
		dateToPay: {
			type: Date,
			required: [true, 'Please provide a date when you will stay!'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);

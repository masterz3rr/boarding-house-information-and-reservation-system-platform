const mongoose = require('mongoose');

const boardingHouseSchema = mongoose.Schema(
	{
		houseName: {
			type: String,
			required: [true, 'Please enter a house name!'],
			trim: true,
			unique: true,
			maxLength: [20, 'House name characters exceeds 20!'],
		},
		description: {
			type: String,
			required: [true, 'Please provide room type!'],
		},
		availableRooms: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'room',
			},
		],
		accepted: {
			type: String,
			default: false,
		},
		image: {
			type: String,
			default: '',
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('BoardingHouse', boardingHouseSchema);

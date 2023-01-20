const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please provide a first name'],
			trim: true,
			max: 20,
		},
		middleName: {
			type: String,
			required: [true, 'Please provide a middle name'],
			trim: true,
			max: 20,
		},
		lastName: {
			type: String,
			required: [true, 'Please provide a last name'],
			trim: true,
			max: 20,
		},
		email: {
			type: String,
			required: [true, 'Please provide an email'],
			trim: true,
			unique: true,
			index: true,
			lowercase: true,
		},
		contact: {
			type: String,
			required: [true, 'Please provide a contact number'],
			trim: true,
			unique: true,
			min: 10,
			max: 10,
		},
		region: {
			type: String,
			required: [true, 'Please provide an address'],
		},
		province: {
			type: String,
			required: [true, 'Please provide an address'],
		},
		city: {
			type: String,
			required: [true, 'Please provide an address'],
		},
		barangay: {
			type: String,
			required: [true, 'Please provide an address'],
		},
		region: {
			type: String,
			required: [true, 'Please provide an address'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			min: 8,
			select: false,
		},
		role: {
			type: String,
			required: true,
			enum: ['landlord', 'tenant', 'admin'],
			default: 'user',
		},
		active: {
			type: String,
			default: true,
		},
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'room',
		},
		image: {
			type: String,
			default: '',
		},
		noBH: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);

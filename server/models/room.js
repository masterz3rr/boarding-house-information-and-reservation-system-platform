const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
	{
		roomName: {
			type: String,
			required: [true, 'Please provide room name!'],
            unique: true
		},
		type: {
			type: String,
			required: [true, 'Please provide room type!'],
		},
		description: {
			type: String,
			required: [true, 'Please provide room type!'],
		},
		prize: {
			type: String,
			required: ['true', 'Please provide room prize!'],
		},
		allowedTenant: {
			type: Number,
			required: [true, 'Please provide how many tenants are allowed!'],
		},
		images: [
			{
				public_id: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
		tenant: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		],
        available: {
            type: Boolean,
            default: true
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);

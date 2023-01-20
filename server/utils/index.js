const jwt = require('jsonwebtoken');

exports.validateEmail = (email) => {
	const emailRegEx =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegEx.test(String(email).toLowerCase());
};

exports.validatePhone = (phone) => {
	const phoneRegEx = /^(9|\+63)\d{9}$/;
	return phoneRegEx.test(String(phone).toLowerCase());
};

exports.createToken = (user) => {
	// Sign the JWT
	if (!user.role) {
		throw new Error('No user role specified');
	}
	if (!user._id) {
		throw new Error('No user id specified');
	}

	return jwt.sign(
		{
			sub: user._id,
			email: user.email,
			role: user.role,
			firstName: user.firstName,
			middleName: user.middleName,
			lastName: user.lastName,
			iss: 'api.boardingHouse',
			aud: 'api.boardingHouse',
		},
		process.env.JWT_SECRET_KEY,
		{ algorithm: 'HS256', expiresIn: '5h' }
	);
};

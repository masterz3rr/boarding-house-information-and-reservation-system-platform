const express = require('express');
const cors = require('cors');
const {expressjwt: jwt} = require('express-jwt');
const jwtDecode = require('jwt-decode');

const app = express();
app.use(cors());

exports.attachUser = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'Authentication Invalid' });
	}

	const decodedToken = jwtDecode(token);

	if (!decodedToken) {
		return res
			.status(401)
			.json({ message: 'There was a problem in authorizing the request' });
	} else {
		req.user = decodedToken;
		next();
	}
};

exports.requireAdmin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	if (req.user.role !== 'admin') {
		return res.status(403).json({ message: 'Role not permitted' });
	}
	next();
};

exports.requireAuthorized = (req, res, next) => {
	const roles = ['admin'];
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	if (!roles.includes(req.user.role)) {
		return res.status(403).json({ message: 'Role not permitted' });
	}
	next();
};

exports.requireAuthenticated = (req, res, next) => {
	const roles = ['tenant', 'landlord', 'admin'];
	if (!req.user) {
		return res.status(401).json({
			message: 'There was a problem authorizing the request',
		});
	}
	if (!roles.includes(req.user.role)) {
		return res.status(403).json({ message: 'Role not permitted' });
	}
	next();
};

exports.checkJwt = jwt({
	secret: process.env.JWT_SECRET_KEY,
	algorithms: ['HS256'],
	issuer: 'api.boardingHouse',
	audience: 'api.boardingHouse',
	getToken: (req) => req.cookies.token,
});

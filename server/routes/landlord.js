const express = require('express');
const bhCtrl = require('../controllers/landlord/index');
const { checkJwt, attachUser, requireAuthenticated } = require('../middlewares/userIdentification');
const router = express.Router();

router.get(
	'/boardinghouse',
	attachUser,
	checkJwt,
	requireAuthenticated,
	bhCtrl.getUserBH
);
router.post(
	'/boardinghouse',
	attachUser,
	checkJwt,
	requireAuthenticated,
	bhCtrl.createBH
);
// router.post('/register', authCtrl.register);
// router.get('/logout', authCtrl.logout);

module.exports = router;

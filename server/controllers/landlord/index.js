const BoardingHouse = require('./../../models/boardingHouse');

const bhCtrl = {
	getPendingBH: async (req, res) => {},
	getApprovedBH: async (req, res) => {},
	getUserBH: async (req, res) => {
		try {
			const boardingHouse = await BoardingHouse.findOne({
				owner: req.user.sub,
			});

			console.log(boardingHouse);
			res.status(200).json({
				boardingHouse,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({ msg: 'Something went wrong!' });
		}
	},
	createBH: async (req, res) => {
		try {
			const { houseName, description, image } = req.body;

			const houseData = {
				houseName,
				description,
				image,
				owner: req.user.sub,
			};

			console.log(houseData);

			const newHouse = new BoardingHouse(houseData);

			await newHouse.save();
			res.status(200).json({
				msg: 'Boarding House created',
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({ msg: error.message });
		}
	},
};

module.exports = bhCtrl;

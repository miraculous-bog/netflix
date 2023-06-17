const User = require('../models/User');

const updateUserById = async (userId, userData) => {
	return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUserById = async (userId) => {
	await User.findByIdAndDelete(userId);
};

const getUserById = async (userId) => {
	return await User.findById(userId);
};

const getAllUsers = async () => {
	return await User.find();
};

const getNewUsers = async () => {
	return await User.find().sort({ _id: -1 }).limit(5);
};

const getUserStats = async () => {
	return await User.aggregate([
		{
			$project: {
				month: { $month: "$createdAt" },
			},
		},
		{
			$group: {
				_id: "$month",
				total: { $sum: 1 },
			},
		},
	]);
};

module.exports = {
	updateUserById,
	deleteUserById,
	getUserById,
	getAllUsers,
	getNewUsers,
	getUserStats
};
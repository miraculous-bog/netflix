const User = require('../models/User');
const CryptoJS = require("crypto-js");

const saveUser = async (userData) => {
	const { username, email, password } = userData;

	const encryptedPassword = CryptoJS.AES.encrypt(
		password,
		process.env.SECRET_KEY
	).toString();

	const newUser = new User({
		username,
		email,
		password: encryptedPassword
	});

	const savedUser = await newUser.save();
	console.log(savedUser);
	return savedUser;
};

const findUser = async (filter) => {
	const user = await User.findOne(filter);
	return user;
};

module.exports = {
	saveUser,
	findUser
};
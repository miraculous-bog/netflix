const { saveUser, findUser } = require('../services/authService');

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



const registerAuth = async (req, res, next) => {
	const user = await saveUser(req.body);;
	return res.status(200).json({ message: `succesfully registered`, user });
};


const authenticateAuth = async (req, res, next) => {
	try {
		const foundUser = await findUser({ email: req.body.email });
		if (!foundUser) {
			return res.status(401).json("Invalid username or password");
		}

		const bytes = CryptoJS.AES.decrypt(foundUser.password, process.env.SECRET_KEY);
		const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

		if (decryptedPassword !== req.body.password) {
			return res.status(401).json("Invalid username or password");
		}

		const accessToken = jwt.sign(
			{ id: foundUser._id, isAdmin: foundUser.isAdmin },
			process.env.SECRET_KEY,
			{ expiresIn: "5d" }
		);

		const { password, ...userInfo } = foundUser._doc;

		return res.status(200).json({ ...userInfo, accessToken });
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports = {
	registerAuth,
	authenticateAuth,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const hashPassword = async (password) => {
	const hash = await bcrypt.hash(password, 10);
	return hash;
};

const createAuthToken = (user_id) => {
	const accessToken = jwt.sign(
		{ user_id, type: "access" },
		process.env.SESSION_SECRET,
		{ expiresIn: "24h" }
	);
	const refreshToken = jwt.sign(
		{ user_id, type: "refresh" },
		process.env.SESSION_SECRET,
		{ expiresIn: "720h" }
	);
	return { accessToken, refreshToken };
};

const comparePasswords = async (password, userPassword) => {
	const match = await bcrypt.compare(password, userPassword);
	return match;
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const { accessToken, refreshToken } = createAuthToken(user.id);

	res.status(statusCode).json({
		success: true,
		accessToken,
		refreshToken,
	});
};

module.exports = {
	hashPassword,
	createAuthToken,
	comparePasswords,
	isValidObjectId,
	sendTokenResponse,
};

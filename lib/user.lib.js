const User = require("../models/user.model");

class UserLib {
	constructor() {
		this.UserModel = User;
	}

	createUser = async (userDetails) => {
		const { UserModel } = this;
		const { email, username, password, firstname, lastname } = userDetails;
		let user;
		try {
			user = new UserModel({
				email,
				password,
				firstname,
				lastname,
				username,
			});
			return await user.save();
		} catch (error) {
			throw new ErrorResponse(`${error.message}`, 500);
		}
	};
	fetchUsers = async () => {
		const { UserModel } = this;
		const users = await UserModel.find({}).exec();
		return users;
	};
	fetchUser = async (value) => {
		const { UserModel } = this;
		const user = await UserModel.findOne({ ...value }).exec();
		return user;
	};
	fetchUserWithPassword = async (value) => {
		const { UserModel } = this;
		const user = await UserModel.findOne({ ...value })
			.select("password")
			.exec();
		return user;
	};
}

module.exports = UserLib;

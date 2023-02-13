const UserModel = require("../models/user.model");

class UserLib {
	fetchUsers = async () => {
		const users = await UserModel.find({}).exec();
		return users;
	};
	fetchUser = async (value) => {
		const user = await UserModel.findOne({ ...value }).exec();
		return user;
	};
	fetchUserWithPassword = async (value) => {
		const user = await UserModel.findOne({ ...value })
			.select("password")
			.exec();
		return user;
	};
}

module.exports = UserLib;

const passport = require("passport");
const LocalStrategy = require("passport-local");
const { comparePasswords, hashPassword } = require("../utils/utility.util");

const Userlib = require("../lib/user.lib");

const { createUser, fetchUserWithPassword } = new Userlib();

const localStrategy = new LocalStrategy(async function verify(
	username,
	password,
	cb
) {
	try {
		let user = await fetchUserWithPassword({ username });
		if (!user) {
			const encryptedPassword = await hashPassword(password);
			user = await createUser({ username, password: encryptedPassword });
		}
		const passwordMatch = await comparePasswords(password, user.password);
		if (passwordMatch) {
			return cb(null, { id: user.id, username });
		}
		return cb(null, false, { message: "Incorrect username or password." });
	} catch (err) {
		if (err) {
			return cb(err);
		}
	}
});

passport.use(localStrategy);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

module.exports = passport;

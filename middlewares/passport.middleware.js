const passport = require("passport");
const LocalStrategy = require("passport-local");
const FacebookStrategy = require("passport-facebook");

const { comparePasswords, hashPassword } = require("../utils/utility.util");
const Userlib = require("../lib/user.lib");
const { createUser, fetchUserWithPassword } = new Userlib();

const { APP_URL, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;

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

const facebookStrategy = new FacebookStrategy(
	{
		clientID: FACEBOOK_APP_ID,
		clientSecret: FACEBOOK_APP_SECRET,
		callbackURL: `${APP_URL}/api/v1/auth/login/facebook/callback`,
		profileFields: ["id", "emails", "name"],
	},
	async function (accessToken, refreshToken, profile, cb) {
		const json = profile._json;
		const username = `${json.last_name}_${json.first_name}`;
		const password = json.id;
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
	}
);

passport.use(localStrategy);

passport.use(facebookStrategy);

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

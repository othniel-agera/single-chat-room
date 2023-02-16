const isLoggedPages = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.redirect("/login");
	}
};
const isLoggedAPI = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(404).json({
			message: "Login",
		});
	}
};

module.exports = { isLoggedPages, isLoggedAPI };

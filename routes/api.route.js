const { Router } = require("express");
const passport = require("../middlewares/passport.middleware");
const { signup, login } = require("../controllers/user.controller");
const { signupValidator, loginValidator } = require("../utils/validator.util");

const router = Router();

/* GET users listing. */
router.get("/", function (req, res) {
	res.status(200).send({
		message: "Welcome to the Single-Chat-Room API",
	});
});

router.post("/auth/signup", signupValidator, signup);
router.post(
	"/auth/login",
	loginValidator,
	passport.authenticate("local", {
		successReturnToOrRedirect: "/chat",
		failureRedirect: "/login",
		failureMessage: true,
	})
);

router.all("*", (req, res) => {
	res.status(404).json({
		message: "Invalid request, Route does not exist",
	});
});

module.exports = router;

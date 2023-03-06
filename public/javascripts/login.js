const schema = joi.object().keys({
	username: joi
		.string()
		.required()
		.messages({ "string.empty": "Username required" }),
	password: joi
		.string()
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
		.required()
		.label("Password")
		.messages({
			"string.min": "{#label} Must have at least 8 characters",
			"string.pattern.base":
				"{#label} must include at least eight characters, one uppercase and lowercase letter and one number",
		}),
});
const validateForm = () => {
	let username = document.forms["login-form"]["username"].value;
	let password = document.forms["login-form"]["password"].value;

	const validate = schema.validate({ username, password });

	if (validate.error) {
		alert(validate.error);
		return false;
	}
};

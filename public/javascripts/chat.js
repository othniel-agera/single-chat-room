const socket = io();

(async () => {
	const users = await axios.get(
		`http://localhost:${process.env.PORT}/api/v1/users`
	);
	console.log(users);

	const usersList = document.getElementById("users");

	for (let i = 0; i < users.data.data.length; i++) {
		const userChild = document.createElement("li");
		const node = document.createTextNode(users.data.data[i].username);
		userChild.appendChild(node);
		usersList.appendChild(userChild);
	}
})();

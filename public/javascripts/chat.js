const socket = io();

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const input = document.getElementById("input");

(async () => {
	const users = await axios.get(`/api/v1/users`);

	const usersList = document.getElementById("users");
	for (let i = 0; i < users.data.data.length; i++) {
		const userChild = document.createElement("li");
		const node = document.createTextNode(users.data.data[i].username);
		userChild.appendChild(node);
		usersList.appendChild(userChild);
	}
})();

socket.on("message", (message) => {
	outputMessage(message);

	//scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

//submit message
chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const msg = e.target.elements.msg.value;

	// socket.emit("chatMessage", msg);
	// e.target.elements.msg.value = "";
	// e.target.elements.msg.focus();
});

//output message to DOM
const outputMessage = (message) => {
	const div = document.createElement("div");
	div.classList.add("message");
	div.innerHTML = ` <p class="meta">user <span>6:00</span></p>
  <p class="text">${message}</p>`;
	document.querySelector(".chat-messages").appendChild(div);
};

const postMessage = async (msgText) => {
	const msg = await axios.post(`/api/v1/messages`, {
		messageText: msgText,
		timeSent: new Date(),
	});
};

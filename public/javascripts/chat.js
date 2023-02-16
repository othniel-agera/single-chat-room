const socket = io();

<<<<<<< HEAD
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const input = document.getElementById("input");

socket.on("message", (message) => {
  outputMessage(message);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//submit message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = ` <p class="meta">user <span>6:00</span></p>
  <p class="text">${message}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location.href = window.location.href;
  } else {
  }
});
=======
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
>>>>>>> 22d6edb2c9a13c007dabbb3283ca5850bfb4e40b

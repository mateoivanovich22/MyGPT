const socket = io();
const form = document.getElementById("message-form");
form.addEventListener("submit", fromSubmit);

async function fromSubmit(event) {
  event.preventDefault();
  const messageInput = document.getElementById("message-input").value;

  const message = messageInput
  document.getElementById("message-input").value = "";

  socket.emit("messageCreated", message);

}

const respuestaHTML = document.getElementById("respuestaHTML");

socket.on("responseCreated", (messageResponse) => {
  respuestaHTML.innerHTML = messageResponse
});
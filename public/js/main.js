const socket = io();
const mesagess = document.getElementById("chatbox");
const text = document.getElementById("textbox");
const btn = document.getElementById("button");

btn.addEventListener("click", function(e){
    if (text.value)
    socket.emit("chat", text.value);
});

socket.on("chat", msg => {
    console.log(msg);
    mesagess.innerHTML += `<div>${msg}</div>`
});
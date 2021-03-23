const socket = io();
const chat = document.getElementById("chat");
const mesagess = document.getElementById("chatbox");
const text = document.getElementById("textbox");
const btn = document.getElementById("button");
const login = document.getElementById("login");
const username = document.getElementById("namebox");
const lgoinbtn = document.getElementById("loginbtn");
const logged = document.getElementById("logged");

lgoinbtn.addEventListener('click', function(e) {
    appendMesage('You Joined');
    socket.emit('login', {username: username.value});
});

btn.addEventListener("click", function(e){
    e.preventDefault();
    if(text.value)
    appendMesage(`You: ${text.value}`)
    if (text.value != null)
    socket.emit("chat", {username: logged.textContent, message: text.value});
    text.value = '';
});

socket.on('logged', name => {
    login.style.display = 'none';
    chat.style.display = '';
    logged.innerHTML = name.username;
});

socket.on('conected', name => {
    appendMesage(`${name.username} conected`);
});

socket.on('user-disconnected', name => {
    appendMesage(`${name.username} disconnected`)
});

socket.on("chat", msg => {
    console.log(msg);
    mesagess.innerHTML += `<div><b>${msg.username}</b>:${msg.message}</div>`
});

function appendMesage(data) {
    const dataElement = document.createElement('div');
    dataElement.innerText = data;
    mesagess.append(dataElement);
};
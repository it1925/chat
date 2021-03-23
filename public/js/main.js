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
    socket.emit('login', {username: username.value});
});

btn.addEventListener("click", function(e){
    if (text.value)
    socket.emit("chat", {username: logged.textContent, message: text.value});
});

socket.on('logged', msg => {
    login.style.display = 'none';
    chat.style.display = '';
    //při pasní zpráv zobrazuje uživatelovo jméno
    logged.innerHTML = msg.username;
});

socket.on("chat", msg => {
    console.log(msg);
    mesagess.innerHTML += `<div><b>${msg.username}</b>:${msg.message}</div>`
});
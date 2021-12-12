// const socket = io("http://localhost:8000");
const socket = io("https://kak-socketio-server.herokuapp.com/:8000");

// server
socket.on("connect", () => {
  console.log("Client connected to: " + socket.id); 
  online = true;
});

socket.on('send-data', res => {
  recieveData(res); 
});

socket.on("disconnect", () => {
  console.log("Client disconnected from" + socket.id); 
});
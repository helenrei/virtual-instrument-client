// Socket.io server configuration
const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("Client connected to: " + socket.id); // x8WIv7-mJelg7on_ALbx
  online = true;
});

socket.on('send-data', res => {
  recieveData(res); 
});

socket.on("disconnect", () => {
  console.log("Client disconnected from" + socket.id); 
});
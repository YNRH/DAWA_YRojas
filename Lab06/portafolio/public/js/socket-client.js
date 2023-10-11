// socket-client.js
const socket = io(); // Conectar al servidor WebSocket

// Manejar una nueva valoración en tiempo real
socket.on("nueva-valoracion", (data) => {
  // Aquí puedes procesar la notificación y mostrarla en el área de notificaciones
  const notificacionesDiv = document.getElementById("notificaciones");
  notificacionesDiv.innerHTML += `<p>Nueva valoración: ${data.valoracion}</p>`;
});








// Importar las dependencias
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Configurar Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static(__dirname + "/public"));

// Ruta para el archivo HTML
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Escuchar la conexión de Socket.IO
io.on("connection", function (socket) {
  console.log("Usuario conectado");

  // Escuchar el evento 'chat message' para ambos usuarios
  socket.on("chat message", function (msg) {
    console.log(`Mensaje de ${msg.nombre}: ${msg.mensaje}`);
    io.emit("chat message", msg);
  });

  // Escuchar la desconexión del usuario
  socket.on("disconnect", function () {
    console.log("Usuario desconectado");
  });
});

// Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function () {
  console.log("Servidor escuchando en http://localhost:3000");
});

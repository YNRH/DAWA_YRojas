const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const nodemailer = require("nodemailer"); // Importa nodemailer

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// Configuración de EJS como motor de plantillas
app.set("view engine", "ejs");

// Configurar Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static(__dirname + "/public"));

// Configura el correo electrónico
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tucorreo@gmail.com", // Reemplaza con tu dirección de correo
    pass: "tucontraseña", // Reemplaza con tu contraseña
  },
});

// Rutas
app.get("/", (req, res) => {
  res.render("index", { profileData }); 
});

app.get("/perfil/:id", (req, res) => {
  const profileId = parseInt(req.params.id, 10);
  const profile = profileData.find((perfil) => perfil.id === profileId);
  if (profile) {
    res.render("perfil", { profile });
  } else {
    // Manejo de error si el perfil no se encuentra
    res.status(404).send("Perfil no encontrado");
  }
});


app.get("/contacto", (req, res) => {
  res.render("contacto");
});

// Ruta para procesar el formulario de contacto
app.post("/enviar-mensaje", (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configura el correo electrónico
  const mailOptions = {
    from: "tucorreo@gmail.com",
    to: "destinatario@gmail.com",
    subject: `Mensaje de ${nombre}`,
    text: `Nombre: ${nombre}\nCorreo Electrónico: ${email}\n\nMensaje:\n${mensaje}`,
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
      // Puedes agregar lógica adicional aquí para manejar el error, como mostrar un mensaje de error al usuario.
    } else {
      console.log("Correo electrónico enviado:", info.response);
      // Puedes redirigir al usuario a una página de confirmación de envío exitoso o mostrar un mensaje de éxito.
      res.redirect("/confirmacion-contacto");
    }
  });
});

// Maneja conexiones WebSocket
io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado");

  // Ejemplo: Notificar a todos los clientes cuando se recibe una nueva valoración
  socket.on("nueva-valoracion", (data) => {
    // Aquí puedes procesar la nueva valoración y enviarla a todos los clientes conectados
    io.emit("nueva-valoracion", data);
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
  });
});

io.emit("nueva-valoracion", { valoracion: "5 estrellas" });

// Servidor escuchando en el puerto 3000
server.listen(port, () => {
  console.log(`Aplicación web ejecutándose en http://localhost:${port}`);
});

//variable local
const profileData = [
  {
    id: 1,
    profileImage: "/images/profile1.jpg",
    profileName: "Anita Solas",
    facebookLink: "#",
    twitterLink: "#",
    instagramLink: "#",
    professionName: "Diseñadora Gráfica",
    serviceCategory: "Diseño y Creatividad",
    skills: ["Diseño de logotipos", "Diseño de folletos", "Ilustración"],
    experience: "10 años de experiencia en diseño gráfico, trabajando en proyectos para clientes de diferentes industrias.",
  },
  {
    id: 2,
    profileImage: "/images/profile2.jpg",
    profileName: "Sebastian Sol",
    facebookLink: "#",
    twitterLink: "#",
    instagramLink: "#",
    professionName: "Desarrollador Web",
    serviceCategory: "Desarrollo de Sitios Web",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    experience: "8 años de experiencia en desarrollo web, creando sitios web interactivos y receptivos para empresas.",
  },
  {
    id: 3,
    profileImage: "/images/profile3.jpg",
    profileName: "Nohemi Mallas",
    facebookLink: "#",
    twitterLink: "#",
    instagramLink: "#",
    professionName: "Contadora Pública",
    serviceCategory: "Contabilidad y Finanzas",
    skills: ["Auditoría financiera", "Impuestos", "Gestión contable"],
    experience: "12 años de experiencia en contabilidad y finanzas, proporcionando servicios de auditoría y asesoramiento financiero a empresas.",
  },
  {
    id: 4,
    profileImage: "/images/profile4.jpg",
    profileName: "Jhon Tiradi",
    facebookLink: "#",
    twitterLink: "#",
    instagramLink: "#",
    professionName: "Fotógrafo Profesional",
    serviceCategory: "Fotografía y Video",
    skills: ["Fotografía de retrato", "Fotografía de eventos", "Edición de fotos"],
    experience: "15 años de experiencia en fotografía, capturando momentos especiales y creando imágenes impresionantes para clientes.",
  },
];

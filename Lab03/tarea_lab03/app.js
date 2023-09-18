const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Ruta de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta de matriculas
app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.render('matriculas');
    } else {
        // Si la autenticación falla, puedes renderizar una vista de error o redireccionar a otra página
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});


app.post('/confirmacion', (req, res) => {
    const curso = req.body.curso;
    const medioPago = req.body.medioPago;
    const modulosSeleccionados = req.body.modulos;
    
    let precio;

    if (curso === 'Java') {
        precio = 1200;
    }
    if (curso === 'PHP') {
        precio = 800;
    }
    if (curso === '.NET') {
        precio = 1500;
    }

    const preciosPorModulo = {
        'Básico': precio,
        'Intermedio': precio,
        'Avanzado': precio
    };

    let subtotal = 0;
    modulosSeleccionados.forEach(modulo => {
        subtotal += preciosPorModulo[modulo];
    });

    var total = subtotal;
    if (medioPago === 'Pago en efectivo') {
        total = subtotal - (subtotal * 0.1);
    }

    res.render('confirmacion', { curso, medioPago, modulosSeleccionados, preciosPorModulo, subtotal, total });
});

// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

function parse_vars(req) {
    var arreglo_parametros = [];
    var parametros = [];
    var valores = [];
  
    if (req && req.url && req.url.indexOf("?") > 0) {
      var url_data = req.url.split("?");
      arreglo_parametros = url_data[1].split("&");
    }
  
    for (i = 0; i < arreglo_parametros.length; i++) {
      var parametro = arreglo_parametros[i];
      var param_data = parametro.split("=");
      parametros[i] = param_data[0];
      valores[i] = param_data[1];
    }
  
    return {
      parametros: parametros,
      valores: valores,
    };
  }
  
  module.exports.parse_vars = parse_vars;
  
  module.exports.batman = {
    identidad: "Bruce Wayne",
    poder: "Dinero",
  };
  
  module.exports.obtenerHoraActual = function () {
    const fecha = new Date();
    return {
      hora: fecha.getHours(),
      minutos: fecha.getMinutes(),
      segundos: fecha.getSeconds(),
    };
  };
  
  module.exports.obtenerHoraEnFormato = function (formato) {
    const horaActual = module.exports.obtenerHoraActual();
    switch (formato) {
      case "hh:mm:ss":
        return `${horaActual.hora}:${horaActual.minutos}:${horaActual.segundos}`;
      case "hh:mm":
        return `${horaActual.hora}:${horaActual.minutos}`;
      default:
        return "Formato no válido";
    }
  };
  
  module.exports.calcularDiasFaltantes = function (fechaObjetivo) {
    const fechaActual = new Date();
    const objetivo = new Date(fechaObjetivo);
    const diferencia = objetivo - fechaActual;
    const diasFaltantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    return diasFaltantes;
  };
  
  const fs = require("fs");
  
  module.exports.manejarRuta = function (ruta, res) {
    const rutaSinSlashInicial = ruta.startsWith("/") ? ruta.slice(1) : ruta;
  
    const paginas = {
      inicio: "inicio.html",
      galeria: "fotos.html",
    };
  
    const pagina = paginas[rutaSinSlashInicial];
  
    if (pagina) {
      fs.readFile(`./${pagina}`, (err, html) => {
        if (err) {
          res.writeHead(500, { "Content-type": "text/plain" });
          res.end("Error interno del servidor");
        } else {
          res.writeHead(200, { "Content-type": "text/html" });
          res.write(html);
          res.end();
        }
      });
    } else {
      res.writeHead(404, { "Content-type": "text/plain" });
      res.end("Página no encontrada");
    }
  };
  
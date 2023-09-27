const http = require('http');
const fs = require('fs');
const url = require('url');
const { parse_vars, batman, obtenerHoraEnFormato, calcularDiasFaltantes } = require('./parser_vars');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  if (pathname === '/') {
    fs.readFile('./form.html', (err, html) => {
      if (err) {
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Error interno del servidor');
      } else {
        let html_string = html.toString();
        
        // Verificar si parsedUrl.query está definido
        if (parsedUrl.query) {
          const params = parse_vars(parsedUrl.query);

          for (const key in params.parametros) {
            if (params.parametros.hasOwnProperty(key)) {
              const value = params.valores[key];
              html_string = html_string.replace(`{${params.parametros[key]}}`, value);
            }
          }
        }

        // Obtener la hora actual en formato hh:mm:ss
        const horaActual = obtenerHoraEnFormato('hh:mm:ss');
        html_string = html_string.replace('{hora_actual}', horaActual);

        // Calcular días faltantes para una fecha específica
        const fechaObjetivo = '2023-12-25';
        const diasFaltantes = calcularDiasFaltantes(fechaObjetivo);
        html_string = html_string.replace('{dias_faltantes}', diasFaltantes);

        html_string = html_string.replace('{identidad}', batman.identidad);
        html_string = html_string.replace('{poder}', batman.poder);

        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write(html_string);
        res.end();
      }
    });
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

server.listen(8084, () => {
  console.log('Servidor en ejecución en el puerto 8084');
});

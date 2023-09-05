var http = require('http');
fs = require('fs');

http.createServer(function(solicitud, respuesta){
    fs.readFile('./index.html', function(error,html){
        respuesta.write(html);
        respuesta.end();
    });
    
}).listen(8084);


const http = require('http');
const url = require('url');
const textProcessor = require('./textProcessor');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/process') {
    const query = parsedUrl.query;
    const text = query.text || '';

    let responseText = '';

    if (query.action === 'splitWords') {
      responseText = textProcessor.splitWords(text).join(', ');
    } else if (query.action === 'extractSubstring') {
      const start = parseInt(query.start) || 0;
      const end = parseInt(query.end) || text.length;
      responseText = textProcessor.extractSubstring(text, start, end);
    } else if (query.action === 'removeSpaces') {
      responseText = textProcessor.removeSpaces(text);
    } else if (query.action === 'capitalize') {
      responseText = textProcessor.capitalize(text);
    } else if (query.action === 'toLowerCase') {
      responseText = textProcessor.toLowerCase(text);
    } else if (query.action === 'toUpperCase') {
      responseText = textProcessor.toUpperCase(text);
    } else if (query.action === 'countCharacters') {
      responseText = `Número de caracteres: ${textProcessor.countCharacters(text)}`;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(responseText);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

server.listen(8082, () => {
  console.log('Servidor en ejecución en el puerto 8082');
});

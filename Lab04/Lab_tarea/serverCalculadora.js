// app.js

const http = require("http");
const url = require("url");
const calculadora = require("./calculadora");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === "/sumar") {
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);
    const resultado = calculadora.sumar(num1, num2);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Resultado: ${resultado}`);
  } else if (pathname === "/restar") {
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);
    const resultado = calculadora.restar(num1, num2);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Resultado: ${resultado}`);
  } else if (pathname === "/multiplicar") {
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);
    const resultado = calculadora.multiplicar(num1, num2);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Resultado: ${resultado}`);
  } else if (pathname === "/dividir") {
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);
    const resultado = calculadora.dividir(num1, num2);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Resultado: ${resultado}`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Operación no encontrada");
  }
});

server.listen(8081, () => {
  console.log("Servidor en ejecución en el puerto 8081");
});

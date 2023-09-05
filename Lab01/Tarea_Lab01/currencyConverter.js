const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("¡Bienvenido al Convertidor de Moneda!");

rl.question("Por favor, ingresa la cantidad en dólares: ", (dolares) => {
  const tasaDeCambio = 0.85; // 1 dólar = 0.85 euros
  const euros = dolares * tasaDeCambio;

  console.log(`$${dolares} dólares son aproximadamente €${euros.toFixed(2)} euros.`);

  rl.close();
});
 
// calculadora.js

module.exports = {
    sumar: function (num1, num2) {
      return num1 + num2;
    },
    restar: function (num1, num2) {
      return num1 - num2;
    },
    multiplicar: function (num1, num2) {
      return num1 * num2;
    },
    dividir: function (num1, num2) {
      if (num2 === 0) {
        return "Error: división por cero";
      }
      return num1 / num2;
    },
  };
  
// Función para dividir una cadena en palabras
function splitWords(text) {
  return text.split(/\s+/);
}

// Función para extraer una cadena de texto entre dos índices
function extractSubstring(text, start, end) {
  return text.slice(start, end);
}

// Función para eliminar espacios en blanco de una cadena
function removeSpaces(text) {
  return text.replace(/\s+/g, "");
}

// Función para capitalizar la primera letra de cada palabra
function capitalize(text) {
  return text.replace(/\b\w/g, (match) => match.toUpperCase());
}

// Función para convertir a minúsculas
function toLowerCase(text) {
  return text.toLowerCase();
}

// Función para convertir a mayúsculas
function toUpperCase(text) {
  return text.toUpperCase();
}

// Función para contar caracteres
function countCharacters(text) {
  return text.length;
}

module.exports = {
  splitWords,
  extractSubstring,
  removeSpaces,
  capitalize,
  toLowerCase,
  toUpperCase,
  countCharacters,
};

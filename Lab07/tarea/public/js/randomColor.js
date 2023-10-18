// En randomColor.js

// Función para generar un color aleatorio en formato hexadecimal
function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// Selecciona todos los elementos con el id "random-color-box"
const elements = document.querySelectorAll("#random-color-box");

// Itera sobre cada elemento y aplica un color aleatorio
elements.forEach((element) => {
  const randomColor = getRandomColor();
  element.style.backgroundColor = randomColor;
});

/*
OBJECT DETECT
*/
let objectDetector;
let objects = [];
let ctx;

async function make() {
  objectDetector = await ml5.objectDetector('cocossd', startDetecting);
  ctx = document.getElementById('objectCanvas').getContext('2d');
}

window.addEventListener('DOMContentLoaded', function() {
  make();
});

function startDetecting(){
  console.log('Modelo listo');
}

function detect(image) {
  objectDetector.detect(image, function(err, results) {
    if(err){
      console.log(err);
      return;
    }
    objects = results;
    draw(image);
    
  });
}

function draw(image) {
  const objectContainer = document.getElementById('object-container');
  objectContainer.innerHTML = ''; // Limpiar cualquier contenido previo

  const canvas = document.getElementById('objectCanvas');
  const scaleFactorX = canvas.width / image.width;
  const scaleFactorY = canvas.height / image.height;

  for (let i = 0; i < objects.length; i++) {
    
    const object = objects[i];
    console.log("Objeto detectado:", object);
    const objectDiv = document.createElement('div');
    objectDiv.classList.add('object');

    // Ajustar tamaño y posición del objeto según la escala
    objectDiv.style.position = 'absolute';
    objectDiv.style.left = object.x * scaleFactorX + 'px';
    objectDiv.style.top = object.y * scaleFactorY + 'px';
    objectDiv.style.width = object.width * scaleFactorX + 'px';
    objectDiv.style.height = object.height * scaleFactorY + 'px';
    objectDiv.textContent = object.label;

    // Estilo adicional para resaltar los objetos
    objectDiv.style.border = '2px solid green';
    objectDiv.style.color = 'green';
    objectDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';

    objectContainer.appendChild(objectDiv);
  }
}

function readURLObjectDetect(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('imageObjectDetect').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function checkObjectDetect() {
  let img = document.getElementById('imageObjectDetect');
  detect(img);

  // Obtener el tamaño original de la imagen
  const originalWidth = img.naturalWidth;
  const originalHeight = img.naturalHeight;

  // Ajustar tamaño del canvas al tamaño original de la imagen
  const canvas = document.getElementById('objectCanvas');
  canvas.width = originalWidth;
  canvas.height = originalHeight;

  // Dibujar la imagen en el canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, originalWidth, originalHeight);

  // Mostrar el div como un popup
  document.getElementById('result-popup').style.display = 'flex';
}

function closePopup() {
  // Ocultar el popup al hacer clic en el botón de cerrar
  document.getElementById('result-popup').style.display = 'none';
}


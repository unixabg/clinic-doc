const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const image = new Image();
image.src = 'clinic.png';

image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
};

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
    context.lineWidth = 3;  // Set the line width to 5 pixels or any other value you prefer
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener('mouseout', () => {
    drawing = false;
});


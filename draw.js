const imageCanvas = document.getElementById('imageCanvas');
const imageContext = imageCanvas.getContext('2d');
const drawingCanvas = document.getElementById('drawingCanvas');
const drawingContext = drawingCanvas.getContext('2d');

const image = new Image();
image.src = 'clinic.png'; // Ensure this path is correct

let drawing = false;
let erasing = false;
let savedImageData;  // Variable to store the canvas state

const eraserButton = document.getElementById('eraserButton');

image.onload = function () {
    // Set natural dimensions for the canvas based on the image size
    imageCanvas.width = drawingCanvas.width = image.naturalWidth;
    imageCanvas.height = drawingCanvas.height = image.naturalHeight;

    // Draw the image onto the image canvas
    imageContext.drawImage(image, 0, 0);

    // Adjust the CSS size to fit the layout without stretching
    adjustCanvasSize();
};

function adjustCanvasSize() {
    const container = document.querySelector('.canvas-container');
    const containerRect = container.getBoundingClientRect();
    imageCanvas.style.width = `${containerRect.width}px`;
    imageCanvas.style.height = `${containerRect.height}px`;
    drawingCanvas.style.width = `${containerRect.width}px`;
    drawingCanvas.style.height = `${containerRect.height}px`;
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: ((evt.clientX - rect.left) / rect.width) * canvas.width,
        y: ((evt.clientY - rect.top) / rect.height) * canvas.height
    };
}

function toggleEraser() {
    erasing = !erasing;
    drawingContext.globalCompositeOperation = erasing ? 'destination-out' : 'source-over';
    eraserButton.textContent = erasing ? "Toggle Drawing" : "Toggle Eraser";
}

function saveCanvasState() {
    savedImageData = drawingContext.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function restoreCanvasState() {
    if (savedImageData) {
        drawingContext.putImageData(savedImageData, 0, 0);
    }
}

drawingCanvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const pos = getMousePos(drawingCanvas, e);
    drawingContext.beginPath();
    drawingContext.moveTo(pos.x, pos.y);
});

drawingCanvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        const pos = getMousePos(drawingCanvas, e);
        drawingContext.lineTo(pos.x, pos.y);
        drawingContext.lineWidth = erasing ? 10 : 3;
        drawingContext.stroke();
    }
});

drawingCanvas.addEventListener('mouseup', () => {
    drawing = false;
    saveCanvasState(); // Save the current state after drawing
});

drawingCanvas.addEventListener('mouseout', () => {
    if (drawing) {
        drawing = false;
        saveCanvasState(); // Save the current state after drawing
    }
});

eraserButton.addEventListener('click', toggleEraser);

// Handle canvas resizing dynamically
window.addEventListener('resize', adjustCanvasSize);


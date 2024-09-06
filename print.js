document.getElementById('submitButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const calendarDay = document.getElementById('calendarDay').value;

    // Format the dates for the filename
    const formattedDOB = dateOfBirth.replace(/\//g, '-');
    const formattedCalendarDay = calendarDay.replace(/\//g, '-');

    // Construct the filename
    const filename = `${formattedDOB}-${lastName}-${firstName}-${formattedCalendarDay}.pdf`;

    // Function to add content and manage new PDF pages
    function addContent(text, yPos) {
        if (yPos > 280) {
            pdf.addPage();
            yPos = 10;  // Reset position for the new page
        }
        return yPos;
    }

    // Use the prepareCanvasForPDF function with a callback to ensure the image and drawings are loaded
    prepareCanvasForPDF(function() {
        const combinedCanvas = document.createElement('canvas');
        const combinedContext = combinedCanvas.getContext('2d');
        const imageCanvas = document.getElementById('imageCanvas');
        const drawingCanvas = document.getElementById('drawingCanvas');

        // Set the dimensions for the combined canvas
        combinedCanvas.width = imageCanvas.width;
        combinedCanvas.height = imageCanvas.height;

        // Draw the image canvas onto the combined canvas
        combinedContext.drawImage(imageCanvas, 0, 0);

        // Draw the drawing canvas on top of the combined canvas
        combinedContext.drawImage(drawingCanvas, 0, 0);

        // Get the combined canvas image data
        const imgData = combinedCanvas.toDataURL('image/png');

        let yPos = 10;
        pdf.text(`Last Name: ${lastName}`, 10, yPos); yPos += 10;
        pdf.text(`First Name: ${firstName}`, 10, yPos); yPos += 10;
        pdf.text(`Date of Birth: ${formattedDOB}`, 10, yPos); yPos += 10;
        pdf.text(`Calendar Day: ${formattedCalendarDay}`, 10, yPos); yPos += 10;

        yPos = addContent(null, yPos);

        // Add the combined image to the PDF
        pdf.addImage(imgData, 'PNG', 10, yPos, 180, 150);
        yPos += 160;

        const textArea = document.getElementById('textArea');
        const lines = textArea.value.split('\n');
        lines.forEach(line => {
            yPos = addContent(line, yPos);
            pdf.text(line, 10, yPos);
            yPos += 10;
        });

        // Save the PDF with the constructed filename
        pdf.save(filename);

        // Restore the original canvas state after generating the PDF
        restoreCanvasState();
    });
});

// Function to redraw the image and any drawings to the canvas
function prepareCanvasForPDF(callback) {
    const imageCanvas = document.getElementById('imageCanvas');
    const drawingCanvas = document.getElementById('drawingCanvas');
    const imageContext = imageCanvas.getContext('2d');
    const drawingContext = drawingCanvas.getContext('2d');
    const image = new Image();
    image.src = 'clinic.png';  // Confirm this path is correct

    // Save the current state of the drawing canvas
    const savedDrawingState = drawingContext.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height);

    image.onload = function() {
        // Clear both canvases
        imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

        // Redraw the base image
        imageContext.drawImage(image, 0, 0);

        // Restore the saved drawing state
        drawingContext.putImageData(savedDrawingState, 0, 0);

        // Once the image and drawings are restored, call the callback function
        if (callback) callback();
    };
}

// Function to restore the original drawing canvas state
function restoreCanvasState() {
    const drawingCanvas = document.getElementById('drawingCanvas');
    const drawingContext = drawingCanvas.getContext('2d');

    // Restore the saved state (if any)
    const savedDrawingState = drawingContext.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height);
    drawingContext.putImageData(savedDrawingState, 0, 0);
}


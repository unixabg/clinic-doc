document.getElementById('submitButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const canvas = document.getElementById('drawingCanvas');
    const textArea = document.getElementById('textArea');

    // Add the canvas as an image to the PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 150); // Adjust dimensions as needed

    // Add the text area content as text to the PDF
    const lines = textArea.value.split('\n');
    lines.forEach((line, index) => {
        pdf.text(line, 10, 170 + (10 * index)); // Adjust positioning as needed
    });

    // Save the created PDF
    pdf.save('download.pdf');
});


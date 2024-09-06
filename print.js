document.getElementById('submitButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const calendarDay = document.getElementById('calendarDay').value;

    // Positioning and styling for the added text
    pdf.setFontSize(10);
    pdf.text(`Last Name: ${lastName}`, 10, 20);
    pdf.text(`First Name: ${firstName}`, 10, 30);
    pdf.text(`Date of Birth: ${dateOfBirth}`, 10, 40);
    pdf.text(`Calendar Day: ${calendarDay}`, 10, 50);

    const canvas = document.getElementById('drawingCanvas');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 60, 180, 150); // Adjust dimensions as needed

    const textArea = document.getElementById('textArea');
    const lines = textArea.value.split('\n');
    lines.forEach((line, index) => {
        pdf.text(line, 10, 220 + (10 * index)); // Adjust positioning as needed
    });

    pdf.save('download.pdf');
});


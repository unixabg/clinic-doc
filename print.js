document.getElementById('submitButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const calendarDay = document.getElementById('calendarDay').value;

    // Replace slashes in dates with dashes or another suitable character for filenames
    const formattedDOB = dateOfBirth.replace(/\//g, '-');
    const formattedCalendarDay = calendarDay.replace(/\//g, '-');

    // Create a filename using the input fields
    const filename = `${formattedCalendarDay}-${formattedDOB}-${lastName}-${firstName}.pdf`;

    // Variables to manage the position on the PDF
    let yPos = 10;

    const addContent = (text, yPos) => {
        if (yPos > 280) {
            pdf.addPage();
            yPos = 10; // Reset position for the new page
        }
        return yPos;
    };

    // Adding text fields
    pdf.text(`Last Name: ${lastName}`, 10, yPos); yPos += 10;
    pdf.text(`First Name: ${firstName}`, 10, yPos); yPos += 10;
    pdf.text(`Date of Birth: ${formattedDOB}`, 10, yPos); yPos += 10;
    pdf.text(`Calendar Day: ${formattedCalendarDay}`, 10, yPos); yPos += 10;

    yPos = addContent(null, yPos);

    // Adding canvas image
    const canvas = document.getElementById('drawingCanvas');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, yPos, 180, 150); // Adjust dimensions as needed
    yPos += 160;

    yPos = addContent(null, yPos);

    // Adding text area content
    const textArea = document.getElementById('textArea');
    const lines = textArea.value.split('\n');
    lines.forEach((line, index) => {
        yPos = addContent(line, yPos);
        pdf.text(line, 10, yPos);
        yPos += 10;
    });

    pdf.save(filename); // Use the dynamic filename
});


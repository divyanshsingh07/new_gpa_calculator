document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cgpa-form');
    const resultContainer = document.getElementById('resultContainer');
    const cgpaResult = document.getElementById('Result');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve input values
        const creditsLastSem = parseFloat(document.getElementById('creditsLastSem').value);
        const cgpaLastSem = parseFloat(document.getElementById('cgpaLastSem').value);
        const creditsThisSem = parseFloat(document.getElementById('creditsThisSem').value);
        const gpaThisSemester = parseFloat(document.getElementById('gpaThisSem').value);

        // Log input values (for debugging)
        console.log('Credits Last Semester:', creditsLastSem);
        console.log('CGPA Last Semester:', cgpaLastSem);
        console.log('Credits This Semester:', creditsThisSem);
        console.log('GPA This Semester:', gpaThisSemester);

        // Validate input values
        if (isNaN(creditsLastSem) || isNaN(cgpaLastSem) || isNaN(creditsThisSem) || isNaN(gpaThisSemester)) {
            alert('Please enter valid numerical values.');
            return;
        }

        // Calculate cumulative grade points
        const totalGradePoints = (creditsLastSem * cgpaLastSem) + (creditsThisSem * gpaThisSemester);
        const totalCredits = creditsLastSem + creditsThisSem;

        // Calculate CGPA
        const calculatedCGPA = totalGradePoints / totalCredits;

        // Log calculated CGPA (for debugging)
        console.log('Calculated CGPA:', calculatedCGPA);

        // Display result
        cgpaResult.textContent = calculatedCGPA.toFixed(2);
        resultContainer.style.display = 'block';
    });
});
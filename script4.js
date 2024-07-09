document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', calculateCGPA);
});

function calculateCGPA() {
    const semGPAs = [];
    const semCredits = [];
    let totalGradePoints = 0;
    let totalCredits = 0;
    let isValid = true;

    for (let i = 1; i <= 8; i++) {
        const semGPAInput = document.getElementById(i + 'thSemGPA');
        const semCreditsInput = document.getElementById(i + 'thSemCredits');
        const semGPA = parseFloat(semGPAInput.value);
        const credits = parseInt(semCreditsInput.value);

        if (!isNaN(semGPA) && !isNaN(credits)) {
            if (semGPA > 10 || semGPA < 0 || credits > 31 || credits < 0) {
                alert('Please enter valid GPA (0 - 10) and credits (0 - 31) for each semester.');
                isValid = false;
                break;
            } else {
                semGPAs.push(semGPA);
                semCredits.push(credits);
                totalGradePoints += semGPA * credits;
                totalCredits += credits;
            }
        }
    }

    if (isValid) {
        const cgpa = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;
        displayResult(cgpa);
    }
}

function displayResult(cgpa) {
    const resultContainer = document.getElementById('resultContainer');
    const resultElement = document.getElementById('Result');

    resultElement.textContent = cgpa.toFixed(2);
    resultContainer.style.display = 'block';
}
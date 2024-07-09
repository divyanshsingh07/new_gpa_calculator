// Get all the input elements
const cat1Marks = document.getElementById('cat1Marks');
const cat2Marks = document.getElementById('cat2Marks');
const internalMarks = document.getElementById('internalMarks');
const labMarks = document.getElementById('labMarks');
const expectedFatMarks = document.getElementById('expectedFatMarks');
const submitButton = document.getElementById('submitButton');
const markResultContainer = document.getElementById('resultContainer');
const markResult = document.getElementById('Result');

// Add event listener to the submit button
submitButton.addEventListener('click', () => {
    // Check if all fields are filled except lab marks
    if (cat1Marks.value === '' || cat2Marks.value === '' || internalMarks.value === '' || expectedFatMarks.value === '') {
        alert('Please fill all the fields except lab marks.');
        return;
    }

    // Check if marks are within the limit
    if (parseInt(cat1Marks.value) > 50 || parseInt(cat2Marks.value) > 50 || parseInt(internalMarks.value) > 30 || parseInt(expectedFatMarks.value) > 100) {
        alert('Please enter valid marks. Maximum marks for each category should not exceed the given limit.');
        return;
    }

    // Calculate total theory marks
    const totalTheoryMarks = 0.3 * parseInt(cat1Marks.value) + 0.3 * parseInt(cat2Marks.value) + 0.4 * parseInt(expectedFatMarks.value) + parseInt(internalMarks.value);
    console.log(totalTheoryMarks);

    // Calculate total lab marks if provided
    const totalLabMarks = labMarks.value !== '' ? 0.25 * parseInt(labMarks.value) : 0;

    // Calculate expected marks
    let expectedMarks;
    if (labMarks.value !== '') {
        expectedMarks = (0.75 * totalTheoryMarks) + totalLabMarks;
    } else {
        expectedMarks = totalTheoryMarks; // If lab marks are not entered, expected marks directly equals total theory marks
    }

    // Display the result
    markResultContainer.style.display = 'block';
    markResult.textContent = expectedMarks.toFixed(2);
});

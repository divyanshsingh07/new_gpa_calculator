const populateTable = () => {
    const tableBody = document.querySelector('#courseTable tbody');

    for (let i = 1; i <= 10; i++) {
        const row = document.createElement('tr');

        const courseCell = document.createElement('td');
        const courseLabel = document.createElement('span');
        courseLabel.textContent = '' + i;
        courseCell.appendChild(courseLabel);
        row.appendChild(courseCell);

        const creditsCell = document.createElement('td');
        const creditsDropdown = createDropdown('credits_' + i, ['Select', '4', '3', '2', '1']);
        creditsCell.appendChild(creditsDropdown);
        row.appendChild(creditsCell);

        const gradeCell = document.createElement('td');
        const gradeDropdown = createDropdown('grade_' + i, ['Select', 'S', 'A', 'B', 'C', 'D', 'E', 'F']);
        gradeCell.appendChild(gradeDropdown);
        row.appendChild(gradeCell);

        const labCell = document.createElement('td');
        const labDropdown = createDropdown('lab_' + i, ['Select', 'Yes', 'No']);
        labDropdown.addEventListener('change', () => {
            validateLabSelection(i);
        });
        labCell.appendChild(labDropdown);
        row.appendChild(labCell);

        const labGradesCell = document.createElement('td');
        const labGradesDropdown = createDropdown('lab_grades_' + i, ['Select', 'S', 'A', 'B', 'C', 'D', 'E', 'F']);
        labGradesCell.appendChild(labGradesDropdown);
        row.appendChild(labGradesCell);

        tableBody.appendChild(row);
    }
};

const createDropdown = (id, options) => {
    const select = document.createElement('select');
    select.id = id;

    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
    });

    return select;
};

const calculateGPA = () => {
    const tableRows = document.querySelectorAll('#courseTable tbody tr');
    let totalGradePoints = 0;
    let totalCredits = 0;

    tableRows.forEach(row => {
        const creditsDropdown = row.querySelector('select[id^="credits_"]');
        const gradeDropdown = row.querySelector('select[id^="grade_"]');
        const labDropdown = row.querySelector('select[id^="lab_"]');
        const labGradesDropdown = row.querySelector('select[id^="lab_grades_"]');

        const selectedCredits = parseInt(creditsDropdown.value);
        const selectedGrade = gradeDropdown.value;
        const hasLab = labDropdown.value === 'Yes';
        const labGrade = labGradesDropdown.value;

        if (!isNaN(selectedCredits) && selectedGrade !== 'Select') {
            let theoryCredits = selectedCredits;
            let labCredits = 0;

            if (hasLab && labGrade !== 'Select') {
                theoryCredits = selectedCredits - 1;
                labCredits = 1;

                const theoryGradePoints = calculateGradePoints(selectedGrade) * theoryCredits;
                const labGradePoints = calculateGradePoints(labGrade) * labCredits;

                totalGradePoints += theoryGradePoints + labGradePoints;
                totalCredits += selectedCredits;
            } else {
                const theoryGradePoints = calculateGradePoints(selectedGrade) * selectedCredits;

                totalGradePoints += theoryGradePoints;
                totalCredits += selectedCredits;
            }
        }
    });

    if (totalCredits > 0) {
        const calculatedGPA = totalGradePoints / totalCredits;
        const gpaResultElement = document.getElementById('Result');
        gpaResultElement.textContent = calculatedGPA.toFixed(2);
        document.getElementById('resultContainer').style.display = 'block';
    }
};

const calculateGradePoints = (grade) => {
    switch (grade) {
        case 'S':
            return 10;
        case 'A':
            return 9;
        case 'B':
            return 8;
        case 'C':
            return 7;
        case 'D':
            return 6;
        case 'E':
            return 5;
        case 'F':
            return 0;
        default:
            return 0;
    }
};

const validateLabSelection = (rowIndex) => {
    const creditsDropdown = document.getElementById('credits_' + rowIndex);
    const labDropdown = document.getElementById('lab_' + rowIndex);

    const selectedCredits = parseInt(creditsDropdown.value);

    if (selectedCredits === 1 && labDropdown.value === 'Yes') {
        labDropdown.value = 'No';
        alert('A course with 1 credit cannot be a lab. Lab selection reset to "No".');
    }
};

populateTable();

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', calculateGPA);

const labDropdowns = document.querySelectorAll('select[id^="lab_"]');
labDropdowns.forEach((labDropdown, index) => {
    labDropdown.addEventListener('change', () => {
        validateLabSelection(index + 1);
    });
});
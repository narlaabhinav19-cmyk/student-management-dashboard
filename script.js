// ======================================
// STUDENT MANAGEMENT SYSTEM
// ======================================


// Get students from localStorage

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// Used when editing a student

let editIndex = -1;


// ======================================
// FORM SUBMIT
// ======================================

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        // Get values from form

        const name =
            document.getElementById("name").value.trim();

        const age =
            document.getElementById("age").value;

        const gender =
            document.getElementById("gender").value;

        const course =
            document.getElementById("course").value;

        const email =
            document.getElementById("email").value.trim();


        // Create student object

        const student = {

            id:
                editIndex === -1
                    ? Date.now()
                    : students[editIndex].id,

            name: name,

            age: age,

            gender: gender,

            course: course,

            email: email
        };


        // Add student

        if (editIndex === -1) {

            students.push(student);

        }

        // Update student

        else {

            students[editIndex] = student;

            editIndex = -1;

            document.getElementById("formTitle")
                .textContent = "Add Student";

            document.getElementById("submitButton")
                .textContent = "Add Student";

            document.getElementById("cancelButton")
                .style.display = "none";
        }


        // Save to localStorage

        saveStudents();


        // Clear form

        document.getElementById("studentForm").reset();


        // Display students

        displayStudents();

    });


// ======================================
// SAVE STUDENTS
// ======================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// ======================================
// DISPLAY STUDENTS
// ======================================

function displayStudents() {

    const tableBody =
        document.getElementById("studentTableBody");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const courseFilter =
        document.getElementById("courseFilter").value;

    const genderFilter =
        document.getElementById("genderFilter").value;


    // Clear table

    tableBody.innerHTML = "";


    let visibleStudents = students.filter(function(student) {


        // Search filter

        const matchesSearch =
            student.name
                .toLowerCase()
                .includes(search)

            ||

            student.email
                .toLowerCase()
                .includes(search);


        // Course filter

        const matchesCourse =
            courseFilter === "All"
            ||
            student.course === courseFilter;


        // Gender filter

        const matchesGender =
            genderFilter === "All"
            ||
            student.gender === genderFilter;


        return (
            matchesSearch
            &&
            matchesCourse
            &&
            matchesGender
        );

    });


    // Display students

    visibleStudents.forEach(function(student) {

        const originalIndex =
            students.indexOf(student);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.age}</td>

            <td>${student.gender}</td>

            <td>${student.course}</td>

            <td>${student.email}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${originalIndex})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${originalIndex})"
                >
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    // Show / hide no students message

    const noStudents =
        document.getElementById("noStudents");


    if (visibleStudents.length === 0) {

        noStudents.style.display = "block";

    }

    else {

        noStudents.style.display = "none";

    }


    // Update statistics

    updateStatistics();

}


// ======================================
// EDIT STUDENT
// ======================================

function editStudent(index) {

    const student =
        students[index];


    document.getElementById("name").value =
        student.name;

    document.getElementById("age").value =
        student.age;

    document.getElementById("gender").value =
        student.gender;

    document.getElementById("course").value =
        student.course;

    document.getElementById("email").value =
        student.email;


    // Store editing index

    editIndex = index;


    // Change form title

    document.getElementById("formTitle")
        .textContent = "Edit Student";


    // Change button

    document.getElementById("submitButton")
        .textContent = "Update Student";


    // Show cancel button

    document.getElementById("cancelButton")
        .style.display = "inline-block";


    // Scroll to form

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================
// CANCEL EDIT
// ======================================

function cancelEdit() {

    editIndex = -1;


    document.getElementById("studentForm")
        .reset();


    document.getElementById("formTitle")
        .textContent = "Add Student";


    document.getElementById("submitButton")
        .textContent = "Add Student";


    document.getElementById("cancelButton")
        .style.display = "none";

}


// ======================================
// DELETE STUDENT
// ======================================

function deleteStudent(index) {

    const student =
        students[index];


    const confirmation =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (confirmation) {

        students.splice(index, 1);

        saveStudents();

        displayStudents();

    }

}


// ======================================
// STATISTICS
// ======================================

function updateStatistics() {

    const total =
        students.length;


    const male =
        students.filter(
            student => student.gender === "Male"
        ).length;


    const female =
        students.filter(
            student => student.gender === "Female"
        ).length;


    document.getElementById("totalStudents")
        .textContent = total;


    document.getElementById("maleStudents")
        .textContent = male;


    document.getElementById("femaleStudents")
        .textContent = female;

}


// ======================================
// INITIAL DISPLAY
// ======================================

displayStudents();
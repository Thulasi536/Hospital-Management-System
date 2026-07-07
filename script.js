// REGISTER
function register() {
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;

    if (user === "" || pass === "") {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Registered Successfully");
    window.location.href = "index.html";
}

// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let storedUser = localStorage.getItem("username");
    let storedPass = localStorage.getItem("password");

    if (user === storedUser && pass === storedPass) {
        alert("Login Successful");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Credentials");
    }
}

// LOGOUT
function logout() {
    window.location.href = "index.html";
}

// PATIENT DATA
let patients = JSON.parse(localStorage.getItem("patients")) || [];
displayPatients();

// ADD
function addPatient() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let disease = document.getElementById("disease").value;

    if (name === "" || age === "" || disease === "") {
        alert("Fill all fields");
        return;
    }

    let patient = { name, age, disease };
    patients.push(patient);

    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();
}

// DISPLAY
function displayPatients() {
    let table = document.getElementById("patientList");
    if (!table) return;

    table.innerHTML = "";

    patients.forEach((p, index) => {
        table.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.disease}</td>
            <td>
                <button onclick="editPatient(${index})">Edit</button>
                <button onclick="deletePatient(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// DELETE
function deletePatient(index) {
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();
}

// EDIT
function editPatient(index) {
    let p = patients[index];

    document.getElementById("name").value = p.name;
    document.getElementById("age").value = p.age;
    document.getElementById("disease").value = p.disease;

    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();
}

// SEARCH
function searchPatient() {
    let search = document.getElementById("search").value.toLowerCase();

    let filtered = patients.filter(p =>
        p.name.toLowerCase().includes(search)
    );

    let table = document.getElementById("patientList");
    table.innerHTML = "";

    filtered.forEach((p, index) => {
        table.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.disease}</td>
            <td>
                <button onclick="editPatient(${index})">Edit</button>
                <button onclick="deletePatient(${index})">Delete</button>
            </td>
        </tr>`;
    });
}
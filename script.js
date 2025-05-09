const spaceContainerISS = document.getElementById("craft-iss");
const spaceContainerTian = document.getElementById("craft-tiangong");

let astros = []; // Global array to hold astronaut data

function checkForAstronauts(button) {
    button.style.display = "none"; // hide button

    fetch('http://api.open-notify.org/astros.json') // get astronaut data
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 

            // Update the Message
            document.getElementById("status").innerHTML = `Whoa there are ${data.number} people in space rn!!`;

            // Store the astronaut data globally
            astros = data.people;
            displayAstronauts(astros); // Display the astronauts
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}

function displayAstronauts(astronauts) {
    // Clear existing astronauts
    while (spaceContainerISS.firstChild) {
        spaceContainerISS.removeChild(spaceContainerISS.firstChild);
    }
    while (spaceContainerTian.firstChild) {
        spaceContainerTian.removeChild(spaceContainerTian.firstChild);
    }

    // Add each Astronaut to their craft
    astronauts.forEach(astro => {
        AddAstro(astro);
    });
}

function AddAstro(astro) {
    let div = document.createElement("div");
    div.classList.add("astro");
    div.innerHTML = astro.name;
    if (astro.craft === "ISS") {
        spaceContainerISS.appendChild(div);
    } else if (astro.craft === "Tiangong") {
        spaceContainerTian.appendChild(div);
    }
}

// Sorting functions
function sortByCraft() {
    const sorted = astros.slice().sort((a, b) => a.craft.localeCompare(b.craft));
    displayAstronauts(sorted);
}

function sortByFirstName() {
    const sorted = astros.slice().sort((a, b) => {
        const firstNameA = a.name.split(" ")[0];
        const firstNameB = b.name.split(" ")[0];
        return firstNameA.localeCompare(firstNameB);
    });
    displayAstronauts(sorted);
}

function sortByLastName() {
    const sorted = astros.slice().sort((a, b) => {
        const lastNameA = a.name.split(" ").pop(); // get the last element as the last name
        const lastNameB = b.name.split(" ").pop();
        return lastNameA.localeCompare(lastNameB);
    });
    displayAstronauts(sorted);
}
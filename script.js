function checkForHondas(button) {
    button.style.display = "none"; // hide button

    fetch('parking.json') // get parking ticket data
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(parking => {
            console.log("all data", parking); 
            let hondas = parking.filter((tick) => tick.make == "HOND");
      console.log("honda data", hondas);
            // Update the Message
            document.getElementById("status").innerHTML = `Whoa there are ${hondas.length} hondas that have parking tix rn!!`;

        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}
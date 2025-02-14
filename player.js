function displayRegistrationData() {
    const registrations = JSON.parse(localStorage.getItem("tournamentRegistrations")) || [];
    const container = document.getElementById("registrationData");
    const messageContainer = document.getElementById("message");

    container.innerHTML = ''; 
    messageContainer.innerHTML = ''; 

    if (registrations.length === 0) {
        messageContainer.innerHTML = "No registrations found.";
    } else {
        registrations.forEach((registration, index) => {
            const regDiv = document.createElement("div");
            regDiv.classList.add("registration");

            regDiv.innerHTML = `
                <h3>Registration #${index + 1}</h3>
                <p><strong>In-Game Name:</strong> ${registration.name}</p>
                <p><strong>UID:</strong> ${registration.uid}</p>
                <p><strong>Phone:</strong> ${registration.phone}</p>
                <p><strong>Email:</strong> ${registration.email}</p>
                <p><strong>Game:</strong> ${registration.game}</p>
                <p><strong>Map:</strong> ${registration.map}</p>
                <p><strong>Mode:</strong> ${registration.mode}</p>
                <p><strong>Time:</strong> ${registration.time}</p>
                <p><strong>Date:</strong> ${registration.date}</p>
                <p><strong>Prize:</strong> ${registration.prize}</p>
                <p><strong>Entry Fee:</strong> ${registration.entry}</p>
                <button class="clear-btn" onclick="clearRegistration(${index})">Clear</button>
            `;
            container.appendChild(regDiv);
        });
    }
}

function clearRegistration(index) {
    const registrations = JSON.parse(localStorage.getItem("tournamentRegistrations")) || [];
    registrations.splice(index, 1); 
    localStorage.setItem("tournamentRegistrations", JSON.stringify(registrations));
    displayRegistrationData(); 
}

displayRegistrationData(); 
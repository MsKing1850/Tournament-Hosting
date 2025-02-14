document.addEventListener("DOMContentLoaded", function () {
    // Function to extract query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Auto-fill form fields from URL parameters (if present)
    document.getElementById("game").value = getQueryParam("game") || "";
    document.getElementById("map").value = getQueryParam("map") || "";
    document.getElementById("mode").value = getQueryParam("mode") || "";
    document.getElementById("time").value = getQueryParam("time") || "";
    document.getElementById("date").value = getQueryParam("date") || "";
    document.getElementById("prize").value = getQueryParam("prize") ? `₹${getQueryParam("prize")}` : "₹0";
    document.getElementById("entry").value = getQueryParam("entry") ? `₹${getQueryParam("entry")}` : "₹0";

    // Handle form submission
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture form data
        const formData = {
            access_key: "1ec48d69-070d-444a-a92d-0c38a53506d1", // Your Web3Forms API key
            name: document.querySelector("[name='Name']").value,
            uid: document.querySelector("[name='UID']").value,
            phone: document.querySelector("[name='Phone']").value,
            email: document.querySelector("[name='Email']").value,
            game: document.getElementById("game").value,
            map: document.getElementById("map").value,
            mode: document.getElementById("mode").value,
            time: document.getElementById("time").value,
            date: document.getElementById("date").value,
            prize: document.getElementById("prize").value,
            entry: document.getElementById("entry").value,
        };

        // Save registration data to localStorage
        let registrations = JSON.parse(localStorage.getItem("tournamentRegistrations")) || [];
        
        // Check if the same game and map are already registered
        const isDuplicate = registrations.some(entry => 
            entry.game === formData.game && 
            entry.map === formData.map && 
            entry.mode === formData.mode &&
            entry.time === formData.time &&
            entry.date === formData.date
        );

        if (isDuplicate) {
            document.getElementById("responseMessage").innerHTML = `<p style="color: red;">This game has already been registered with the same details.</p>`;
            return;
        }

        // Add the new registration to localStorage
        registrations.push(formData);
        localStorage.setItem("tournamentRegistrations", JSON.stringify(registrations));

        // Send data to Web3Forms API
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("responseMessage").innerHTML = `<p style="color: green;">Registration Successful! <br>
                    <a href="registrations_players.html" style="color: blue; text-decoration: underline;">View Registered Players</a>
                </p>`;

                // Redirect to the registrations page after 2 seconds
                setTimeout(() => {
                    window.location.href = "registrations_players.html";
                }, 2000);
            } else {
                document.getElementById("responseMessage").innerHTML = `<p style="color: red;">Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("responseMessage").innerHTML = `<p style="color: red;">Failed to send data. Please try again.</p>`;
        });
    });
});

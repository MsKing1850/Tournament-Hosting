document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let formData = new FormData(this);
    let object = {};
    formData.forEach((value, key) => { object[key] = value });

    let json = JSON.stringify(object);

    let response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json
    });

    let result = await response.json();

    let messageBox = document.getElementById("responseMessage");
    if (result.success) {
        messageBox.innerHTML = "<p style='color: green;'>Message Sent Successfully!</p>";
        this.reset();
    } else {
        messageBox.innerHTML = "<p style='color: red;'>Error: " + result.message + "</p>";
    }
});

const bookingForm = document.getElementById("booking-form");

// Form feedback
function formFeedback(message, isError = false) {
    const feedback = document.getElementById("form-feedback");
    feedback.textContent = message;
    feedback.style.color = isError ? "red" : "green";

    if (feedback.timeoutId) {
        clearTimeout(feedback.timeoutId);
    }

    feedback.timeoutId = setTimeout(() => {
        feedback.textContent = "";
    }, 5000);
}

// Create a new reservation
function createReservation(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const partySize = document.getElementById("party-size").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const specialRequest = document.getElementById("specialRequest").value;

    const dateTime = new Date(`${date}T${time}`);

    const reservationData = {
        name,
        email,
        partySize,
        dateTime,
        specialRequest
    };

    fetch("https://projectdt207g-api.onrender.com/reservation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
    })
    .then(async (res) => {
        const result = await res.json();
        if (!res.ok) {
            formFeedback(result.message || "Failed to make reservation.", true);
            return;
        }
        formFeedback(result.message || "Reservation successful!", false);
        e.target.reset();
    })
    .catch((err) => {
        console.error("Add item error:", err);
        formFeedback("An unexpected error occurred. Please try again.", true);
    });
}

// Attach the event listener
bookingForm.addEventListener("submit", createReservation);
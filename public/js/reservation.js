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

// Frontend form validation 
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const partySize = document.getElementById("party-size").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name) {
        formFeedback("Please enter your name.", true);
        return false;
    }
    if (!email || !email.includes("@")) {
        formFeedback("Please enter a valid email.", true);
        return false;
    }
    if (!partySize) {
        formFeedback("Please select a party size.", true);
        return false;
    }
    if (!date) {
        formFeedback("Please select a date.", true);
        return false;
    }
    if (!time) {
        formFeedback("Please select a time.", true);
        return false;
    }

    // Check if date/time is in the future
    const now = new Date();
    const selectedDate = new Date(date);
    const selectedDateTime = new Date(`${date}T${time}`);

    // Compare only date parts (year, month, day)
    const todayStr = now.toISOString().split("T")[0];
    const selectedDateStr = date;

    if (selectedDateStr < todayStr) {
        formFeedback("Please select today or a future date.", true);
        return false;
    }

    // If date is today, check time
    if (selectedDateStr === todayStr && selectedDateTime <= now) {
        formFeedback("Please select a time later than now.", true);
        return false;
    }

    return true;
}


// Create a new reservation
function createReservation(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const partySize = document.getElementById("party-size").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const specialRequest = document.getElementById("specialRequest").value.trim();

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
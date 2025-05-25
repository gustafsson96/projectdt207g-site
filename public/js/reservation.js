"use strict";

// Get booking form
const bookingForm = document.getElementById("booking-form");

// Function to display user feedback
function formFeedback(message, isError = false) {
    const feedback = document.getElementById("form-feedback");
    feedback.textContent = message;
    feedback.style.color = isError ? "red" : "green";

    // Ensure previous timeouts are cleared
    if (feedback.timeoutId) {
        clearTimeout(feedback.timeoutId);
    }

    // Automatically clear message after 5 seconds
    feedback.timeoutId = setTimeout(() => {
        feedback.textContent = "";
    }, 5000);
}

// Function to validate reservation form in frontend
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const partySize = document.getElementById("party-size").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    /* Required field checks */
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

    // Check if date and time is in the future
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);

    // Only allow future dates (including today's date)
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


// Function to create a new reservation
function createReservation(e) {
    e.preventDefault(); // Prevent default form submission

    // Run validation 
    if (!validateForm()) {
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const partySize = document.getElementById("party-size").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const specialRequest = document.getElementById("specialRequest").value.trim();

    // Combine date and time into a single Date object
    const dateTime = new Date(`${date}T${time}`);

    // Format data to match API structure
    const reservationData = {
        name,
        email,
        partySize,
        dateTime,
        specialRequest
    };

    // Send the POST request to the API
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

            // Success message and reset form 
            formFeedback(result.message || "Reservation successful!", false);
            e.target.reset();
        })
        .catch((err) => {
            console.error("Add item error:", err);
            formFeedback("An unexpected error occurred. Please try again.", true);
        });
}

// Attach form submit handler
bookingForm.addEventListener("submit", createReservation);
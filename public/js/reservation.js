"use strict";

// Get booking form
const bookingForm = document.getElementById("booking-form");
const bookingContainer = document.getElementById("booking-container");
const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");

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

    if (date < todayStr) {
        formFeedback("Please select today or a future date.", true);
        return false;
    }

    // If date is today, check time
    if (date === todayStr && selectedDateTime <= now) {
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

            // On success, replace form with booking confirmation
            bookingContainer.innerHTML = `
            <h2>Thank you, ${name}!</h2>
            <div class="booking-confirmation">
            <p>We look forward to welcoming you at The Green Slice.</p>
            <p><b>Booking confirmation:</b></p>
            <p>Date: ${date}</p>
            <p>Time: ${time}</p>
            <p>Number of Guests: ${partySize}</p>
            <p>Special Requests: ${specialRequest ? specialRequest : "None"}</p>
            <button class="btn" onclick="window.location.href='index.html'">Home</button>
            </div>
        `;
        })
        .catch((err) => {
            console.error("Add item error:", err);
            formFeedback("An unexpected error occurred. Please try again.", true);
        });
}

// Filter time options based on selected date
function updateTimeOptions() {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();

    Array.from(timeSelect.options).forEach(option => {
        option.disabled = false;
        option.hidden = false;
    })

    const isToday = selectedDate.toDateString() === today.toDateString();

    if (isToday) {
        Array.from(timeSelect.options).forEach(option => {
            const timeValue = option.value;
            if (!timeValue) return;

            // Parse hours and minutes from the value
            const [hours, minutes] = timeValue.split(":").map(Number);

            const fullDateTime = new Date(`${dateInput.value}T${timeValue}`);
            fullDateTime.setHours(hours, minutes, 0, 0);
            
            if (fullDateTime <= today) {
                option.disabled = true;
                option.hidden = true;
            }
        });

        if (timeSelect.value && timeSelect.options[timeSelect.selectedIndex].disabled) {
            timeSelect.value = "";
        }
    }
}

// Attach form submit handler
bookingForm.addEventListener("submit", createReservation);
dateInput.addEventListener("change", updateTimeOptions);
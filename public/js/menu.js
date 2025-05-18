"use strict";

/* Fetch menu items */
async function getMenuItems() {
    let url = "https://projectdt207g-api.onrender.com/menu";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("Menu items: ", data);

        displayMenuItems(data);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

/* Function to display menu items */
function displayMenuItems(menuItemArray) {
    const menuItemLi = document.getElementById("menu-list");

    menuItemLi.innerHTML = '';

    if (!menuItemArray || menuItemArray.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No menu items to display.";
        menuItemLi.appendChild(message);
        return;
    }

    menuItemArray.forEach(menuItem => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("menu-item");

        const name = document.createElement("h2");
        name.textContent = menuItem.name;

        const ingredients = document.createElement("p");
        ingredients.textContent = `Ingredients: ${menuItem.ingredients.join(", ")}`;

        const price = document.createElement("p");
        price.textContent = `Price: $${menuItem.price.toFixed(2)}`;

        const vegan = document.createElement("p");
        vegan.textContent = `Vegan alternative: ${menuItem.vegan_alternative ? "Yes" : "No"}`;

        itemDiv.appendChild(name);
        itemDiv.appendChild(ingredients);
        itemDiv.appendChild(price);
        itemDiv.appendChild(vegan);

        menuItemLi.appendChild(itemDiv);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    getMenuItems();
});
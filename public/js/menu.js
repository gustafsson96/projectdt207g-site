"use strict";

// Array to store fetched menu items
let allMenuItems = [];

// Boolean to track vegan filter
let showVeganOnly = false;

/* Fetch menu items from backend API */
async function getMenuItems() {
  let url = "https://projectdt207g-api.onrender.com/menu";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    allMenuItems = data;

    // Display fetched menu items 
    displayMenuItems(allMenuItems);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

/* Function to display menu items to the DOM */
function displayMenuItems(menuItemArray) {
  const menuItemLi = document.getElementById("menu-list");
  menuItemLi.innerHTML = '';

  // Handle empty menu
  if (!menuItemArray || menuItemArray.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No menu items to display.";
    menuItemLi.appendChild(message);
    return;
  }

  // Filter items if vegan-only toggle is active
  let filteredItems;
  if (showVeganOnly) {
    filteredItems = menuItemArray.filter(item => item.vegan_alternative);
  } else {
    filteredItems = menuItemArray;
  }

  /* Group menu items by category */
  const categories = {};
  filteredItems.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  /* Loop through each category and create elements to render items */
  Object.keys(categories).forEach(category => {
    const heading = document.createElement("h2");
    heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    heading.classList.add("category-heading");
    menuItemLi.appendChild(heading);

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    /* Menu item card */
    categories[category].forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("menu-item");

      /* Item name */
      const name = document.createElement("h3");
      name.textContent = item.name;

      /* Ingredients list */
      const ingredients = document.createElement("p");
      if (category.toLowerCase() === "other drinks") {
        ingredients.textContent = `${item.ingredients.join(", ")}`;
      } else {
        ingredients.textContent = `Ingredients: ${item.ingredients.join(", ")}`;
      }


      /* Price */
      const price = document.createElement("p");
      price.textContent = `Price: $${item.price.toFixed(2)}`;

      itemDiv.appendChild(name);
      itemDiv.appendChild(ingredients);
      itemDiv.appendChild(price);

      // Add label for items with vegan alternative 
      if (item.vegan_alternative) {
        const veganLabel = document.createElement("p");
        veganLabel.classList.add("vegan-label");

        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-leaf");

        veganLabel.appendChild(icon);
        itemDiv.appendChild(veganLabel);
      }

      /* Add item to category container */
      categoryContainer.appendChild(itemDiv);
    });

    /* Append full category to the main menu list */
    menuItemLi.appendChild(categoryContainer);
  });
}

// Function to toggle vegan filter
function veganToggle() {
  const toggleVeganBtn = document.getElementById("vegan-toggle");

  toggleVeganBtn.addEventListener("click", () => {
    showVeganOnly = !showVeganOnly;
    toggleVeganBtn.textContent = showVeganOnly ? "Show Original Menu" : "Show Vegan Menu";
    displayMenuItems(allMenuItems);
  })
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  getMenuItems();
  veganToggle();
});
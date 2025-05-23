"use strict";

let allMenuItems = [];
let showVeganOnly = false;

/* Fetch menu items */
async function getMenuItems() {
  let url = "https://projectdt207g-api.onrender.com/menu";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    allMenuItems = data;
    console.log("Menu items: ", data);
    displayMenuItems(allMenuItems);
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

  // Vegan filter
  let filteredItems;
  if (showVeganOnly) {
    filteredItems = menuItemArray.filter(item => item.vegan_alternative);
  } else {
    filteredItems = menuItemArray;
  }

  const categories = {};
  filteredItems.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  Object.keys(categories).forEach(category => {
    const heading = document.createElement("h2");
    heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    heading.classList.add("category-heading");
    menuItemLi.appendChild(heading);

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    categories[category].forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("menu-item");

      const name = document.createElement("h3");
      name.textContent = item.name;

      const ingredients = document.createElement("p");
      ingredients.textContent = `Ingredients: ${item.ingredients.join(", ")}`;

      const price = document.createElement("p");
      price.textContent = `Price: $${item.price.toFixed(2)}`;

      itemDiv.appendChild(name);
      itemDiv.appendChild(ingredients);
      itemDiv.appendChild(price);

      // Vegan label 
      if (item.vegan_alternative) {
        const veganLabel = document.createElement("p");
        veganLabel.classList.add("vegan-label");

        // Create font awesome icon
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-leaf");

        veganLabel.appendChild(icon);
        itemDiv.appendChild(veganLabel);
      }

      categoryContainer.appendChild(itemDiv);
    });

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

document.addEventListener("DOMContentLoaded", () => {
  getMenuItems();
  veganToggle();
});
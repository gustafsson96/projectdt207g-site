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

    const categories = {};
    menuItemArray.forEach(item => {
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
  
        categoryContainer.appendChild(itemDiv);
      });
  
      menuItemLi.appendChild(categoryContainer);
    });
  }

document.addEventListener("DOMContentLoaded", () => {
    getMenuItems();
});
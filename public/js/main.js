"use strict";

function toggleMenu() {
    const navLinks = document.querySelector('#nav-links');
    const hamburgerMenu = document.querySelector('#hamburger-menu');
  
    navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector('#hamburger-menu');
  
    if (hamburgerMenu) {
      hamburgerMenu.addEventListener('click', toggleMenu);
    }
  });
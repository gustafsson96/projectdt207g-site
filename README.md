# PROJECT - WEBSITE (Backend-baserad webbutveckling, DT207G)

## Overview

This website is part of the final project for the course Backend-baserad webbutveckling, dt207g, at Mittuniversitet, Sundsvall. It serves as the frontend website for the fictional restaurant *The Green Slice*, welcoming users and showcasing the restaurant’s menu, story, and philosophy. The menu data is fetched dynamically from the backend API, ensuring that it is always up-to-date.
<br><br>
Link to the live website: **[The Green Slice](https://dt207gprojectjg.netlify.app)**
<br><br>
The other parts of the project are:
* Frontend admin page: [Admin page repository](https://github.com/gustafsson96/projectdt207g-admin.git)
* The backend API: [API repository](https://github.com/gustafsson96/projectdt207g-api.git)

## Features
* Responsive design.
* Dynamic fetching and displaying of menu items from backend API.
* Mobile-friendly hamburger menu for screens smaller than 768px.
* Information about the company.
* Filter menu on vegan options only.
* Make a table reservation via a booking form.

## Technologies Used
* HTML for basic structure
* CSS for styling. 
* JavaScript for responsive navbar and fetching and displaying menu items.
* Vite for development server and build.
* Netlify for deployment.

## Run Locally
* Clone the repository: git clone https://github.com/gustafsson96/projectdt207g-site.git
* Navigate to project folder: cd project-name
* Install dependencies: npm install
* Start the development server with Vite: npm run dev

## Deployment
This website has been deployed using [Netlify](https://www.netlify.com) using the following steps:
* Login/signup to Netlify
* Click "Add new project" > "Import an existing project" > "Github"
* Connect to the projects GitHub repository
* Set project name (optional)
* Ensure the following settings are set:
  * Branch to deploy: main
  * Build command: npm run build
  * Publish directory: dist
* Click the deploy button at the bottom of the page
<br><br>
The deployed website can be found here: **[The Green Slice](https://dt207gprojectjg.netlify.app)**

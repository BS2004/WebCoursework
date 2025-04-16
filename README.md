# WebCoursework
Repository for Web development practical coursework 

This project is a Node.js web application for managing dance courses and classes.

## Features

- Public users can:
  - View courses and class schedules
  - Enroll in individual classes
- Organisers can:
  - Log in to manage courses and classes
  - Add/update/delete courses and classes
  - View participant lists
  - Manage organiser accounts

The application uses:
- Node.js + Express for the server
- Mustache for templating
- NeDB for data storage
- Basic session handling for login/logout
---

## Dependencies
Install these packages using npm:

```bash
npm install express mustache-express express-session nedb body-parser
```
---
##  Running the Website

1. Clone or download the project (https://github.com/BS2004/WebCoursework.git)
2. Open your terminal and navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node app.js
```

5. Open your browser and go to:

```
http://localhost:3000

```
---

## File Structure

- `/routes`: contains public and organiser route files
- `/views`: Mustache templates for rendering pages
- `/db`: NeDB database files and initializations
- `/public`: static assets like CSS
- `app.js`: entry point of the application
---

## Deployment Notes

If deploying to Heroku or similar services:
- Add a `Procfile`: `web: node app.js`
- Ensure all `.db` files are stored in `/db` folder
- Be aware NeDB does not persist across restarts on Heroku

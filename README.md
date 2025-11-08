# Wild West Forum 🤠

A tiny discussion forum set in a Wild West theme.  
Built for my COS498 midterm to learn Docker, Node.js, Express, Handlebars, and Nginx.

---

## What this app does

- Lets new users **register** with a username and password.
- Lets users **log in**.
- Shows a **forum page** where posts can be displayed.  
- Uses a **desert background theme** to match the Wild West idea.
- Runs in **two Docker containers**:
  - a Node.js app container
  - an Nginx web server container
- Deployed on a DigitalOcean Droplet.

This is a learning project, not a production-ready app.

---

## How the code is organized

- `node/` – all of the application code.
  - `src/server.js` – the main Express server.
  - `src/views/` – Handlebars templates (pages).
    - `layouts/main.hbs` – shared layout (header, nav, footer).
    - `home.hbs`, `login.hbs`, `register.hbs`, `forum.hbs` – page content.
  - `src/public/` – static files served directly by Express.
    - `css/styles.css` – page styling and background image.
    - `images/desert-wild-west.jpg` – the background picture.
- `docker-compose.yml` – starts the Node app and Nginx together.
- `node/Dockerfile` – how to build the Node.js image.

---

## How to run it locally (for someone who clones the repo)

Requirements:

- Node.js (v18+)
- Docker and Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/wild-west-forum.git
cd wild-west-forum
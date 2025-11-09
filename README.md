Wild West Forum
Author: Michael Ness
University of Maine – COS 498 Web Development (Fall 2025)

Description:
Wild West Forum is a full-stack Node.js and Express web forum application developed for the COS 498 Web Development course at the University of Maine. The project demonstrates containerized web deployment using Docker, Nginx, and GitHub, all developed on a Windows machine and hosted on a DigitalOcean droplet running Ubuntu. The forum allows users to register, log in, create posts, and view discussions, while managing user sessions through express-session middleware. The site is served through an Nginx reverse proxy that handles public-facing requests and forwards them to the Node.js container internally.

This project fulfills the assignment requirements for hosting, containerization, version control, and reproducible deployment. It also demonstrates real-world concepts like Docker image building, port mapping, rebuilds, and troubleshooting 502 Bad Gateway errors.

Technologies Used:
Frontend: HTML, CSS, and Handlebars (HBS templates)
Backend: Node.js and Express
Session Management: express-session
Proxy / Web Server: Nginx
Containerization: Docker and Docker Compose
Hosting: DigitalOcean Droplet (Ubuntu)
Development Environment: Windows 10 using VS Code and Docker Desktop
Version Control: Git and GitHub

Project Structure:
wild-west-forum/
├── node/
│ ├── src/
│ │ ├── JS/server.js (Main Express app)
│ │ ├── views/ (Handlebars templates)
│ │ ├── public/ (CSS and static files)
│ │ └── package.json
├── nginx/
│ └── default.conf (Reverse proxy configuration)
├── docker-compose.yml
└── README.txt

Run Instructions:

Running Locally (Windows + Docker Desktop):

Clone the repository:
git clone https://github.com/michaelness1/wild-west-forum.git

cd wild-west-forum

Build and start the containers:
docker compose up --build -d

Open a browser and visit:
http://localhost:8087

When done:
docker compose down

Running on DigitalOcean Droplet (Ubuntu):

SSH into the droplet:
ssh root@<your-droplet-ip>

Pull the latest repository:
cd ~/wild-west-forum
git pull

Stop and rebuild containers:
docker compose down
docker compose up --build -d

Open in browser:
http://<your-droplet-ip>:8087

Deployment Notes:
-Express application runs internally on port 3000.
-Nginx maps host port 8087 to container port 80 using docker-compose.yml.
-Rebuilding containers after code changes ensures updated templates and routes are included.
-All deployment and rebuild commands were executed via SSH on the DigitalOcean droplet.

Challenges:

Challenge 1: Slow “Building dependency tree” during apt-get install
The initial Docker installation on the Ubuntu droplet took a long time resolving dependencies. I learned that installing Docker Compose manually via GitHub binaries is often faster than waiting for apt to process all dependencies.

Challenge 2: 502 Bad Gateway after port changes
After changing the Express app port from 3000 to 8087, the Nginx proxy could no longer connect. This taught me that Nginx expects the internal port to remain the same and that only external host ports (such as 8087:80) should be modified safely.

Challenge 3: Site not showing updated home.hbs
After updating templates like home.hbs, the live site didn’t change because Docker cached the old build. I learned that Handlebars templates are baked into the image and require a full rebuild with “docker compose up --build -d” for updates to appear.

Challenge 4: Missing Docker Compose command
The Ubuntu image didn’t include the Compose plugin by default. I fixed this by installing it manually with curl and chmod from the official GitHub release, which was faster and more reliable than using apt.

Challenge 5: Route mismatch errors (/forum/posts vs /posts)
Some template links used /forum/posts/ while my Express route only defined /posts/:id. I solved this by adding an alias route in server.js and making sure the template href paths matched.

Challenge 6: Rebuilds taking a long time

Challenge 7: Version mismatch between GitHub and droplet code
Sometimes I edited files locally but forgot to push to GitHub, so the droplet built from an older version. I learned to always git push locally and git pull on the droplet before rebuilding to ensure consistency.
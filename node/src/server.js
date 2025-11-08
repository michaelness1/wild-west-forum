// ------------------------------------------
// Wild West Forum - Node.js Server
// ------------------------------------------

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Static Files ----------
const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Wild West Forum</title>
        <style>
          body { 
            font-family: 'Segoe UI', sans-serif;
            background-color: #fdf6ec;
            color: #3a2e1e;
            text-align: center;
            padding: 60px;
          }
          h1 { font-size: 2.5rem; }
          p { font-size: 1.2rem; }
        </style>
      </head>
      <body>
        <h1>🤠 Wild West Forum</h1>
        <p>Server is running on port ${PORT} and proxy-ready for Nginx.</p>
      </body>
    </html>
  `);
});

// Example API route (for later expansion)
app.get("/api/hello", (req, res) => {
  res.json({ message: "Howdy partner! The API is alive." });
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`✅ Wild West Forum running on http://localhost:${PORT}`);
});
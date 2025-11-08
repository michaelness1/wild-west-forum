// src/server.js

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');

const routes = require('./routes');   // your routes.js
const state = require('./state');     // if you're using this
const { requireAuth } = require('./middleware'); // if needed

//  Create the app FIRST
const app = express();

// ---------- Middleware & static files ----------

// Serve static files from /public
app.use(express.static(path.join(__dirname, '../public')));


// Body parsing
app.use(express.urlencoded({ extended: true }));

// Sessions (if you're using them)
app.use(
  session({
    secret: 'wild-west-secret',
    resave: false,
    saveUninitialized: false,
  })
);

// ---------- View engine (hbs) ----------

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// if you have layouts/partials:
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// ---------- Routes ----------

app.use('/', routes);

// Simple 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

// ---------- Start server ----------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Wild West Forum listening on port ${PORT}`);
});
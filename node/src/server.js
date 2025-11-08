// node/src/server.js
const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');

app.use(express.static(__dirname + 'public/'));

const routes = require('./routes');

const app = express();

// ---------- View engine: HBS ----------
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// If you add partials (views/partials/header.hbs, etc.)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// ---------- Middleware ----------
app.use(express.urlencoded({ extended: false })); // parse form data

app.use(
  session({
    secret: 'wild-west-secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Put current user on res.locals so all templates can see it
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ---------- Routes ----------
app.use('/', routes);

// ---------- Start server ----------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🤠 Wild West Forum listening on port ${port}`);
});
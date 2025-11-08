const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// If you have a routes.js file, keep this require.
// If not, you can remove the next line and the app.use('/', routes) line.
const routes = require('./routes'); // make sure node/src/routes.js exists

// ----------------------
// Middleware
// ----------------------

// Parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions (for login / logged-in state)
app.use(
  session({
    secret: 'wild-west-secret-change-me',
    resave: false,
    saveUninitialized: false,
  })
);

// Serve static files from node/src/public
//   -> /css/styles.css
//   -> /images/desert-wild-west.jpg
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------
// Handlebars view engine
// ----------------------
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main', // uses views/layouts/main.hbs
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ----------------------
// Routes
// ----------------------

// If you have a routes.js file exporting an Express router:
app.use('/', routes);

// If you DON'T have a routes.js, comment the line above and instead add e.g.:
// app.get('/', (req, res) => {
//   res.render('home', { title: 'Home' });
// });

// ----------------------
// Start server
// ----------------------
app.listen(PORT, () => {
  console.log(`Wild West Forum server listening on port ${PORT}`);
});
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

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
// -> /css/styles.css
// -> /images/desert-wild-west.jpg
app.use(express.static(path.join(__dirname, 'public')));

// ----------------------
// Handlebars view engine
// ----------------------
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main', // views/layouts/main.hbs
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ----------------------
// Routes (inline)
// ----------------------

// Home page
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Forum page
app.get('/forum', (req, res) => {
  res.render('forum', { title: 'Forum' });
});

// New post page
app.get('/posts/new', (req, res) => {
  res.render('new-post', { title: 'New Post' });
});

// Register page
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).render('home', {
    title: 'Not found',
    errorMessage: 'Page not found.',
  });
});

// ----------------------
// Start server
// ----------------------
app.listen(PORT, () => {
  console.log(`Wild West Forum server listening on port ${PORT}`);
});
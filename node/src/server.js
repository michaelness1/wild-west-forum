// node/src/server.js
const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

// ----- View engine (Handlebars) -----
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// ----- Middleware -----
app.use(express.urlencoded({ extended: true }));

// Static files (CSS, images, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// ----- Simple in-memory "state" -----
const state = {
  users: [],
  posts: [],
  comments: []
};

// ----- Routes -----

// Home page
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Wild West Forum',
    posts: state.posts
  });
});

// Forum page
app.get('/forum', (req, res) => {
  res.render('forum', {
    title: 'Forum',
    posts: state.posts
  });
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Register page
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// New post page
app.get('/posts/new', (req, res) => {
  res.render('new-post', { title: 'New Post' });
});

// Handle new post submit
app.post('/posts', (req, res) => {
  const { title, body } = req.body;
  state.posts.push({ id: state.posts.length + 1, title, body });
  res.redirect('/forum');
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Wild West Forum listening on port ${PORT}`);
});
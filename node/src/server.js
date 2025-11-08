//node/src/server.js
const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

//handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

//middleware
app.use(express.urlencoded({ extended: true }));

//Static files (CSS, images, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

const state = {
  users: [],
  posts: [],
  comments: []
};

//Routes

//Home page
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Wild West Forum',
    posts: state.posts
  });
});

//Forum page
app.get('/forum', (req, res) => {
  res.render('forum', {
    title: 'Forum',
    posts: state.posts
  });
});

//Login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.post('/login', (req,res) => {
  const {username, password } = req.body;

  const user = users.find(
    (u)  => u.username === username && u.password === password
  );

  if (!user) {
    return res.send("invalid username or password");
  }

  //redirect user
  res.redirect('/forum');
});

//Register page
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('register',(req,res) => {
  const { username, password} = req.body;

  if (!username || !password) {
    return res.send("Username and password are required!");
  }

  users.push({username, password});
  res.redirect('/login');
});

//add logout page
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

//New post page
app.get('/posts/new', (req, res) => {
  res.render('new-post', { title: 'New Post' });
});

//Handle new post submit
app.post('/posts', (req, res) => {
  const { title, body } = req.body;
  state.posts.push({ id: state.posts.length + 1, title, body });
  res.redirect('/forum');
});

//start server
app.listen(PORT, () => {
  console.log(`Wild West Forum listening on port ${PORT}`);
});
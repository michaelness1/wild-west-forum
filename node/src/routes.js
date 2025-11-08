// node/src/routes.js
const express = require('express');
const {
  createUser,
  validateUser,
  createPost,
  getAllPosts,
  getPostById,
} = require('./state');

const { requireLogin, requireLoggedOut } = require('./middleware');

const router = express.Router();

// ---------- Home ----------
router.get('/', (req, res) => {
  // If logged in, send to forum; otherwise show simple landing page
  if (req.session.user) {
    return res.redirect('/forum');
  }
  res.render('home'); // views/home.hbs
});

// ---------- Register ----------
router.get('/register', requireLoggedOut, (req, res) => {
  res.render('register', { error: null, form: {} });
});

router.post('/register', requireLoggedOut, (req, res) => {
  const { username, password, confirm } = req.body;

  const form = { username }; // for repopulating

  if (!username || !password || !confirm) {
    return res.render('register', {
      error: 'Please fill out all fields.',
      form,
    });
  }

  if (password !== confirm) {
    return res.render('register', {
      error: 'Passwords do not match.',
      form,
    });
  }

  try {
    const user = createUser(username, password);
    req.session.user = { username: user.username };
    res.redirect('/forum');
  } catch (err) {
    return res.render('register', {
      error: err.message,
      form,
    });
  }
});

// ---------- Login ----------
router.get('/login', requireLoggedOut, (req, res) => {
  res.render('login', { error: null, form: {} });
});

router.post('/login', requireLoggedOut, (req, res) => {
  const { username, password } = req.body;
  const form = { username };

  if (!username || !password) {
    return res.render('login', {
      error: 'Please enter username and password.',
      form,
    });
  }

  const user = validateUser(username, password);

  if (!user) {
    return res.render('login', {
      error: 'Invalid username or password.',
      form,
    });
  }

  req.session.user = { username: user.username };
  res.redirect('/forum');
});

// ---------- Logout ----------
router.post('/logout', requireLogin, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// ---------- Forum (list posts) ----------
router.get('/forum', requireLogin, (req, res) => {
  const posts = getAllPosts();
  res.render('forum', {
    posts,
  });
});

// ---------- New Post ----------
router.get('/forum/new', requireLogin, (req, res) => {
  res.render('new-post', { error: null, form: {} });
});

router.post('/forum/new', requireLogin, (req, res) => {
  const { title, body } = req.body;
  const form = { title, body };

  if (!title || !body) {
    return res.render('new-post', {
      error: 'Please enter both a title and some content.',
      form,
    });
  }

  const author = req.session.user.username;
  const post = createPost(author, title, body);
  res.redirect(`/forum/posts/${post.id}`);
});

// ---------- View Single Post ----------
router.get('/forum/posts/:id', requireLogin, (req, res) => {
  const post = getPostById(req.params.id);
  if (!post) {
    return res.status(404).render('post-not-found'); // optional template
  }

  res.render('post', { post });
});

module.exports = router;
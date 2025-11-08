// node/src/routes.js
import express from 'express';
import { users, comments, sessions } from './state.js';
import { requireAuth } from './middleware.js';
import { v4 as uuid } from 'uuid';

const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('home', { layout: 'main', title: 'Home' });
});

// Register
router.get('/register', (req, res) => {
  res.render('register', { layout: 'main', title: 'Register' });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).render('register', {
      layout: 'main', title: 'Register',
      error: 'Username already taken.'
    });
  }
  users.push({ username, password }); // insecure on purpose
  res.redirect('/login');
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { layout: 'main', title: 'Login' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const found = users.find(u => u.username === username && u.password === password);
  if (!found) {
    return res.status(401).render('login', {
      layout: 'main', title: 'Login',
      error: 'Invalid username or password.'
    });
  }
  const sid = uuid();
  sessions.set(sid, { user: username, createdAt: new Date() });
  res.cookie('loggedIn', 'true');
  res.cookie('user', username);
  res.cookie('sid', sid);
  req.session.user = username;
  res.redirect('/comments');
});

// Logout
router.post('/logout', (req, res) => {
  const sid = req.cookies?.sid;
  if (sid) sessions.delete(sid);
  res.clearCookie('loggedIn'); res.clearCookie('user'); res.clearCookie('sid');
  req.session.destroy(() => res.redirect('/'));
});

// Comments list
router.get('/comments', (req, res) => {
  res.render('comments', {
    layout: 'main', title: 'Comments',
    comments: comments.map(c => ({ ...c, createdAt: c.createdAt.toLocaleString() }))
  });
});

// New comment (protected)
router.get('/comment/new', requireAuth, (req, res) => {
  res.render('new-comment', { layout: 'main', title: 'New Comment' });
});

router.post('/comment', requireAuth, (req, res) => {
  const text = (req.body?.text || '').toString();
  if (!text.trim()) {
    return res.status(400).render('new-comment', {
      layout: 'main', title: 'New Comment',
      error: 'Comment cannot be empty.'
    });
  }
  comments.push({ author: req.session.user, text, createdAt: new Date() });
  res.redirect('/comments');
});

export default router;
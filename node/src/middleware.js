// node/src/middleware.js

// Only allow access if logged in
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Only allow access if NOT logged in (for /login, /register)
function requireLoggedOut(req, res, next) {
  if (req.session.user) {
    return res.redirect('/forum');
  }
  next();
}

module.exports = {
  requireLogin,
  requireLoggedOut,
};
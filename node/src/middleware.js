// node/src/middleware.js
// ------------------------------------------------------------
// Middleware: small functions that run before your route.
// This one checks if the user is logged in. If not, it shows
// the Login page with an error message.
// ------------------------------------------------------------

export const requireAuth = (req, res, next) => {
  // Our "logged in" rule (intentionally weak for the assignment):
  // - req.session.user must exist (set during Login)
  // - cookie "loggedIn" must be the string 'true'
  if (req.session?.user && req.cookies?.loggedIn === 'true') {
    return next(); // OK: continue to the real route handler
  }

  // Not logged in → send them to the Login template
  return res.status(401).render('login', {
    layout: 'main',
    title: 'Login required',
    error: 'Please log in to continue.'
  });
};
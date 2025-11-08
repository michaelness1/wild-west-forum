// node/src/state.js
// ------------------------------------------------------------
// This file acts as our “in-memory database.”
// It stores all users, comments, and temporary sessions
// while the app is running. When you restart the server,
// everything here resets (on purpose).
// ------------------------------------------------------------

// A list of users who have registered (each has a username and password)
export const users = [];

// A list of comments that users post on the site
export const comments = [];

// A simple key-value “map” to track active login sessions
// Example: sessions.set("some-random-id", { user: "mike", createdAt: new Date() });
export const sessions = new Map();

// That’s it! Other files (like routes.js) will import these lists
// and add, remove, or read data from them in memory.
// node/src/state.js

// Super simple in-memory "database"
const users = [];
const posts = [];

// Helper to generate IDs
let nextPostId = 1;

function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

function createUser(username, password) {
  if (findUserByUsername(username)) {
    throw new Error('Username already taken');
  }
  const user = { username, password }; // plain text for class project
  users.push(user);
  return user;
}

function validateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}

function createPost(author, title, body) {
  const post = {
    id: String(nextPostId++),
    author,
    title,
    body,
    createdAt: new Date(),
  };
  posts.unshift(post); // newest first
  return post;
}

function getAllPosts() {
  return posts;
}

function getPostById(id) {
  return posts.find((p) => p.id === String(id));
}

module.exports = {
  createUser,
  validateUser,
  findUserByUsername,
  createPost,
  getAllPosts,
  getPostById,
};
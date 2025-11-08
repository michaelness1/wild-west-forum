import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>Hello from Wild West Forum!</h1><p>Docker + Node + Nginx working perfectly 🎉</p>");
});

app.listen(PORT, () => {
  console.log(`✅ Wild West Forum running on http://localhost:${PORT}`);
});
import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Hello, world!");
  res.send("Hello, world!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

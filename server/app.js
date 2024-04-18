import express from "express";
import connectDB from "./config/dbConfig.js";
import userRoutes from "./routes/users.js";
const app = express();

connectDB();
app.use(express.json());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  console.log("Hello, world!");
  res.send("Hello, world!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

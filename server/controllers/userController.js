import User from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    user_type: user.user_type,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    user_type: user.user_type,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
export const createUser = async (req, res) => {
  try {
    const { name, email, password, user_type } = req.body;
    const existingUser = await User.findOne({ email, status: "active" });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      user_type: user_type || "user",
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;

    const user = await User.findOne({ _id: userId, refreshToken });

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user);
    res.cookie("accessToken", accessToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
async function getUsers(pageNumber, pageSize) {
  const skip = (pageNumber - 1) * pageSize;
  const users = await User.find({ status: "active" })
    .skip(skip)
    .limit(pageSize);
  // .populate("courses");
  return users;
}
export const getUsersList = async (req, res) => {
  try {
    const pageNumber = req.query.pageNumber || 1;
    const pageSize = req.query.pageSize || 5;
    const users = await getUsers(pageNumber, pageSize);

    const hasNext = users.length === pageSize;

    const hasPrevious = pageNumber > 1;

    res.json({ users, hasNext, hasPrevious });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


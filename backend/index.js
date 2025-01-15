const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const DB_NAME = "social-media";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

mongoose
  .connect(`${process.env.MONGO_URI}/${DB_NAME}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const User = require("./models/Users.models");
const Admin = require("./models/Admins.models");

app.post("/admin/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password.toString(), admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/submit", upload.array("images", 10), async (req, res) => {
  try {
    const { name, handle } = req.body;
    const imagePaths = req.files.map((file) => file.path);

    const newUser = new User({
      name,
      handle,
      images: imagePaths,
    });

    await newUser.save();
    res.status(200).json({ message: "User submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/admin/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const ToDoRouter = require("./routes/ToDoRoutes"); // Import ToDoRouter
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
origin:["https://to-do-app-six-dun.vercel.app/"],
  methods:['POST','GET'],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.error("MongoDB connection error:", err));

// Use ToDoRouter for /api routes
app.use("/api", new ToDoRouter().router); // Notice the change here

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));

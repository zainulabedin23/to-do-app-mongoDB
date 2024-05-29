const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const ToDoRouter = require("./routes/ToDoRoutes"); // Import ToDoRouter
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({

    origin:["https://to-do-app-mongo-db-black.vercel.app"],
      methods:['POST','GET','PUT','DELETE'],
      credentials: true
    }));
    

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.error("MongoDB connection error:", err));

// Use ToDoRouter for /api routes
app.use("/api", new ToDoRouter().router); 

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));

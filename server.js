const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");


const app = express();

// Middleware
app.use(
  cors({
    origin: "https://note-x-app-xi.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);



// Test Route
app.get("/", (req, res) => {
    res.send("NoteX Backend Running 🚀");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


const Note = require("./models/Note");

setInterval(async () => {
    try {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        await Note.deleteMany({
            isDeleted: true,
            deletedAt: { $lte: tenDaysAgo },
        });

        console.log("Old trash cleaned");
    } catch (error) {
        console.log("Cleanup error:", error);
    }
}, 24 * 60 * 60 * 1000); // Runs every 24 hours


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

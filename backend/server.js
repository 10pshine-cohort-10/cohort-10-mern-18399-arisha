require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const initializeDatabase = require("./config/initDb");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Notes App Backend is running!");
});

app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.send("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        res.status(500).send("Database connection failed.");
    }
});

const startServer = async () => {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to initialize database:", error.message);
        process.exit(1);
    }
};

startServer();

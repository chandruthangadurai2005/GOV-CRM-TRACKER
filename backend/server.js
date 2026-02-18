const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const sequelize = require("./config/database");

// Import Models
require("./models/Machine");
require("./models/GPSLog");
require("./models/Farmer");
require("./models/Usage");
require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.set("etag", false);

// Routes
const machineRoutes = require("./routes/machineRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const gpsRoutes = require("./routes/gpsRoutes");
const usageRoutes = require("./routes/usageRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/machines", machineRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/gps", gpsRoutes);
app.use("/api/usage", usageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("CRM Tracking Backend Running...");
});
app.disable("etag"); 
const PORT = process.env.PORT || 5000;

/* ---------------- SOCKET.IO SETUP ---------------- */

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Make io accessible in controllers
app.set("io", io);

// Socket connection event
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

/* ---------------- DB CONNECTION ---------------- */

sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    return sequelize.sync();
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to DB:", err);
  });

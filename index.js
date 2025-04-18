// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");

// Initialize Express app
const app = express();

//update the numbers if the number of proxy increase
app.set("trust proxy", 1);

// Define Global Middlewares
app.use(express.json());

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(cookieParser()); // Parse cookies in request headers
app.use(morgan("common"));
app.use(helmet());

// Simple test route to verify the app is working
app.get("/", (req, res) => {
  res.status(200).send("Hello, world! Open Fintech app is running!");
});

// Get the port from environment variables (default to 3000 if not set)
const port = process.env.PORT;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

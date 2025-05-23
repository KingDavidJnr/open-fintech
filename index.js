// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const { connectDB, syncDB } = require("./config/db.config");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

// Initialize Express app
const app = express();

// Load the YAML file
const swaggerDocument = YAML.load(
  path.join(__dirname, "./src/docs/swagger.yaml")
);

// Middleware
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// Authenticate DB Before Server app starts
connectDB();

// Synchronize the database with models
syncDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

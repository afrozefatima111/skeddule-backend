require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require('path');

const app = express();
const connectDB = require("./config/database");

const API_BASE_NAME = "/api";
const port = process.env.PORT | 5000;
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("workinggggg.....")
})

app.use(`${API_BASE_NAME}/user`, require("./routes/user"));
app.use(`${API_BASE_NAME}/task`, require("./routes/task"));

connectDB();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is on http://localhost:${port}`);
});

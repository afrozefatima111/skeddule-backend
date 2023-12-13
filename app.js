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
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan("dev"));
app.use(helmet());
// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Other middleware and routes...

// Send the index.html file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use(express.urlencoded({extended : true  }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("workinggggg.....")
})

app.use(`${API_BASE_NAME}/user`, require("./routes/user"));
app.use(`${API_BASE_NAME}/task`, require("./routes/task"));

connectDB();  

  app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on http://localhost:${port}`);
  });

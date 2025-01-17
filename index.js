const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Connect to MongoDB
mongoDB();

// Use CORS Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'], // Allow localhost for testing and your deployed frontend
  credentials: true, // Allow cookies and headers
}));

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Base Route
app.get('/', (req, res) => {
  res.send('Hello World!---');
});

// Start the Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

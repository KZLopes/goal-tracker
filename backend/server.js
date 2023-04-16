const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error');
const goalRoutes = require('./routes/goal');

connectDB();

//Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/goals', goalRoutes);

// app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

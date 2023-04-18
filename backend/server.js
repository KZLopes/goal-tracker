const path = require('path');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error');
const goalRoutes = require('./routes/goal');
const userRoutes = require('./routes/user');

connectDB();

//Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname + '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Enviroment is Set to Development'));
}

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

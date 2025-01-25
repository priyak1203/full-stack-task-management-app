const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('express-async-errors');
require('dotenv').config();

const app = express();

// routers
const authRouter = require('./routes/authRoutes');
const menuRouter = require('./routes/menuRoutes');
const orderRouter = require('./routes/orderRoutes');

// error handlers
const notFoundHandler = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// conditions for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.get('/', (req, res) => {
  res.send('Welcome To FDS');
});

app.use('/api/v1', authRouter, menuRouter, orderRouter);

// Not found route middleware
app.use(notFoundHandler);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log(`Connected to DB`));
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

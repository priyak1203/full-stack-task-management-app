const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome To FDS');
});

const PORT = process.env.PORT || 3001;
mongoose;

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

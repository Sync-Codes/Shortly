const mongoose = require('mongoose');
// const config = require('config');
const dotenv = require('dotenv').config();

const uri = `mongodb+srv://${process.env.id}:${process.env.pass}@ryubot.k6y2k.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

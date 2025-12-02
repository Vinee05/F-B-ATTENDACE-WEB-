const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// load env from server.env or .env in repo root
const envPath = path.join(__dirname, '..', 'server.env');
dotenv.config({ path: envPath });

const MONGO_URI = process.env.MONGO_URI || process.env.VITE_MONGO_URI;

async function connect() {
  if (!MONGO_URI) {
    console.warn('MONGO_URI not set — skipping MongoDB connection');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  }
}

module.exports = { connect, mongoose };

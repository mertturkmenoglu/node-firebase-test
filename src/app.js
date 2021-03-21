const express = require('express');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Config and router files
const serviceAccount = require('./config/serviceAccountKey.json');
const appRoutes = require('./routes/appRoutes');

// App init
const app = express();
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const MONGOOSE_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.MONGO_URI, MONGOOSE_OPTIONS, () => {
  console.log('Connected to MongoDB');
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Middlewares
app.use(express.urlencoded({ extended: false }));

// Use router
app.use(appRoutes);

const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = {
  server,
};

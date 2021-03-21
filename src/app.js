const express = require('express');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/User');

// Config and router files
const serviceAccount = require('./config/serviceAccountKey.json');
const appRoutes = require('./routes/appRoutes');

// App init
const app = express();
dotenv.config();

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
});

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// Use router
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use(appRoutes);

const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = {
  server,
};

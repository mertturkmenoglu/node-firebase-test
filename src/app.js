const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./config/serviceAccountKey.json');
const appRoutes = require('./routes/appRoutes');

const app = express();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(appRoutes);

const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = {
  server,
  firebaseApp
};

const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./config/serviceAccountKey.json');

const app = express();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log(firebaseApp.name);

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/', (req, res) => {
  const renderOptions = {
    pageTitle: "Home",
  };

  return res.render('HomePage', renderOptions);
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

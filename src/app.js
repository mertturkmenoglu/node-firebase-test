const express = require('express');

const app = express();

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

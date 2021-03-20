const admin = require('firebase-admin');

const getHomePage = (_req, res) => {
  const renderOptions = {
    path: '/',
    pageTitle: "Home",
  };

  return res.render('HomePage', renderOptions);
}

const createPost = (req, res) => {
  const db = admin.firestore();
  const { username, postContent } = req.body;

  db.collection('posts').add({
    poster: username,
    content: postContent
  }).then(doc => {
    console.log('Content created');
    return res.redirect('/');
  }).catch(err => {
    console.error(err);
    return res.redirect('/')
  })
}

module.exports = {
  getHomePage,
  createPost,
};

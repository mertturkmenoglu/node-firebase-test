const admin = require('firebase-admin');

const getHomePage = (_req, res) => {
  const renderOptions = {
    path: '/',
    pageTitle: "Home",
    posts: [],
  };

  admin.firestore().collection('posts').get()
    .then(snapshot => {
      renderOptions.posts = snapshot.docs.map(it => it.data());
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      return res.render('HomePage', renderOptions);
    });
}

const createPost = (req, res) => {
  const { username, postContent } = req.body;

  admin.firestore().collection('posts').add({
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

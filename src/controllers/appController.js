const admin = require('firebase-admin');

const getHomePage = (_req, res) => {
  const renderOptions = {
    path: '/',
    pageTitle: "Home",
    posts: [],
  };

  admin.firestore()
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      renderOptions.posts = snapshot.docs.map(it => it.data());
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      return res.render('HomePage', renderOptions);
    });
}

const createPost = (req, res) => {
  const { username, postContent } = req.body;

  admin.firestore()
    .collection('posts')
    .add({
      poster: username,
      content: postContent,
      createdAt: new Date(),
    })
    .then(_doc => {
      return res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      return res.redirect('/')
    })
}

const getLoginPage = (req, res) => {
  const renderOptions = {
    path: '/login',
    pageTitle: "Login",
  };

  return res.render('LoginPage', renderOptions);
}

const getRegisterPage = (req, res) => {
  const renderOptions = {
    path: '/register',
    pageTitle: "Register",
  };

  return res.render('RegisterPage', renderOptions);
}

module.exports = {
  getHomePage,
  createPost,
  getLoginPage,
  getRegisterPage,
};

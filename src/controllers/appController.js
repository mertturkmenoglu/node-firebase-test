const admin = require('firebase-admin');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const getHomePage = (req, res) => {
  const renderOptions = {
    path: '/',
    pageTitle: "Home",
    posts: [],
    user: null,
  };

  if (req.user) {
    renderOptions.user = req.user;
  }

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

const getLoginPage = (_req, res) => {
  const renderOptions = {
    path: '/login',
    pageTitle: "Login",
    user: null,
  };

  return res.render('LoginPage', renderOptions);
}

const getCreatePostPage = (req, res) => {
  const renderOptions = {
    path: '/create-post',
    pageTitle: "Create Post",
    user: null,
  };

  if (req.user) {
    renderOptions.user = req.user;
  }

  return res.render('CreatePostPage', renderOptions);
}

const getRegisterPage = (_req, res) => {
  const renderOptions = {
    path: '/register',
    pageTitle: "Register",
    user: null,
  };

  return res.render('RegisterPage', renderOptions);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null) {
    return res.redirect('/login');
  }

  const passwordEqual = await bcrypt.compare(password, user.password);

  if (!passwordEqual) {
    return res.redirect('/login');
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  return req.session.save(_err => {
    res.redirect('/');
  });
}

const register = async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.redirect('/register');
  }

  if (password.length < 6) {
    return res.redirect('/register');
  }

  const userExists = await User.findOne({ email });

  if (userExists !== null) {
    return res.redirect('/register');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email: email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.user = savedUser;
    return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.redirect('/register');
  }
}

const logout = (req, res) => {
  req.session.destroy(_err => {
    res.redirect('/');
  });
}

module.exports = {
  getHomePage,
  createPost,
  getLoginPage,
  getRegisterPage,
  getCreatePostPage,
  login,
  register,
  logout,
};

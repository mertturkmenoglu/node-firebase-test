const getHomePage = (_req, res) => {
  const renderOptions = {
    path: '/',
    pageTitle: "Home",
  };

  return res.render('HomePage', renderOptions);
}

const createPost = (req, res) => {
  console.log('Create Post');
  return res.status(200).send('Message received');
}

module.exports = {
  getHomePage,
  createPost,
};

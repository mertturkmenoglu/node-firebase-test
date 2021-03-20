const getHomePage = (_req, res) => {
  const renderOptions = {
    path: '/',
    pageTitle: "Home",
  };

  return res.render('HomePage', renderOptions);
}

module.exports = {
  getHomePage,
};

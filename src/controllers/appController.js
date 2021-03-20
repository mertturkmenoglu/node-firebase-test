const getHomePage = (_req, res) => {
  const renderOptions = {
    pageTitle: "Home",
  };

  return res.render('HomePage', renderOptions);
}

module.exports = {
  getHomePage,
};

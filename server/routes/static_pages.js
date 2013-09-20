exports.index = function(req, res) {
  res.render('layout/index');
};

exports.home = function(req, res) {
  res.render('static_pages/home');
};

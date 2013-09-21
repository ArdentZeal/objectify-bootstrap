exports.index = function(req, res) {
  res.sendfile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
};

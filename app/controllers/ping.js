module.exports = function() {
  var app = this.app;

  app.get('/ping', function(req, res) {
    res.send({ pong: true });
  });
};

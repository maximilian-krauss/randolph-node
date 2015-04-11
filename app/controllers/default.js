module.exports = function() {
  var app = this.app
      crawler = this.crawler;

  app.get('/', function(req, res) {
    res
      .status(403)
      .send('Forbidden');
  });
}

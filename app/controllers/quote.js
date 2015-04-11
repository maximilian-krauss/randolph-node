var _ = require('lodash');

module.exports = function() {
  var app = this.app
      crawler = this.crawler;

  var _getRandomQuote = function() {
    var random_quote = crawler.quotes[Math.floor(Math.random() * crawler.quotes.length)];
    var referenced_post = _.find(crawler.posts, { id: random_quote.postReference });

    return {
      quote: random_quote,
      post: referenced_post
    };
  };

  app.get('/quote', function(req, res) {
    var random_quote = _getRandomQuote();
    if(!random_quote) {
      return res.status(404).send();
    }

    res.render('quote', random_quote);
  });

  app.get('/quote.json', function(req, res) {
    var random_quote = _getRandomQuote();
    if(!random_quote) {
      return res.status(404).send();
    }

    res.send(random_quote);
  });
};

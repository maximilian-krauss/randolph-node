var _ = require('lodash'),
    buzzwords = require('../../buzzwords.json');

module.exports = function() {
  var app = this.app,
      crawler = this.crawler;

  var _getQuotesFor = function(buzzword) {
    buzzword = buzzword.toLowerCase();

    return _.chain(crawler.quotes)
      .filter({ matchedBuzzword: buzzword })
      .map(function(itm) {
        return {
          quote: itm,
          post: crawler.linkWith(itm.postReference)
        };
      })
      .value();
  };

  app.get('/buzzwords', function(req, res) {
    res.render('buzzwords', { buzzwords: buzzwords });
  });

  app.get('/buzzwords/json', function(req, res) {
    res.send(buzzwords);
  });


  app.get('/buzzwords/:buzzword', function(req, res) {
    var buzzword = req.params.buzzword;
    if(!buzzword) {
      return res.status(400);
    }

    var quotes = _getQuotesFor(buzzword);

    res.render('buzzword', { quotes: quotes });
  });

  app.get('/buzzwords/:buzzword/json', function(req, res) {

    var buzzword = req.params.buzzword;
    if(!buzzword) {
      return res.status(400);
    }

    var quotes = _getQuotesFor(buzzword);

    res.send(quotes);
  });
};

var _ = require('lodash'),
    all = require('require-tree')
    express = require('express'),
    exphbs = require('express-handlebars'),
    app = express();

var controllers = all('./app/controllers'),
    crawler = require('./app/crawler');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

_.each(controllers, function(controller) {
  controller.apply({
    app: app,
    crawler: crawler
  });
});


function goRandolphGo() {
  var port = process.env.PORT || 6060;

  crawler.crawl(function(err) {
    if(err) {
      return console.log('Crawler fucked up:', err);
    }

    console.log('awesome, crawler, so much quotes,', crawler.quotes.length, ', yay, much output')
  });

  var server = app.listen(port, function() {
    var h = server.address().address;
    var p = server.address().port;

    console.log('Aww yeah. Randolph is up and running at http://%s:%s', h, p); // Baxxter
  });
}

goRandolphGo();

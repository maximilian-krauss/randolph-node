var _ = require('lodash'),
    $ = require('cheerio'),
    request = require('request'),
    base_url = 'http://blog.ralfw.de';

var _guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

var _findAndParsePosts = function(html, cb, posts) {
  var html_document = $.load(html),
      fetched_posts = posts || [];

  html_document('div.post').each(function(i, elem) {
  posts.push({
      id: _guid(),
      title: $(this).find('h3.post-title a').text(),
      url: $(this).find('h3.post-title a').attr('href'),
      content: $(this).find('.post-body').text()
    });
  });

  var next_up = html_document('body')
    .find('.blog-pager-older-link')
    .first()
    .attr('href');

  cb(null, posts, next_up);
};

var _parseUrl = function(url, cb, posts) {
  posts = posts || [];

  console.log(url);

  request(url, function(err, resp, html) {
    if(err) {
      return cb(err);
    }

    _findAndParsePosts(html, function(err, fetched_posts, next_up) {
      if(err) {
        return cb(err);
      }

      if(next_up) {
        return _parseUrl(next_up, cb, fetched_posts);
      }
      else {
        return cb(null, posts);
      }
    }, posts);
  });
};

module.exports = function(cb) {
  _parseUrl(base_url, cb);
};

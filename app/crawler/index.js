var _ = require('lodash'),
    posts = require('./posts'),
    quotes = require('./quotes');

var _removeContentFrom = function(post) {
  return {
    id: post.id,
    title: post.title,
    url: post.url
  };
};

module.exports = {
  crawl: function(cb) {
    that = this;

    posts(function(err, posts) {
      if(err) return cb(err);

      that.posts = _(posts)
        .map(_removeContentFrom)
        .value();

      quotes(posts, function(err, q) {
        if(err) return cb(err);

        that.quotes = q;
        cb(null);
      });
    });
  },
  quotes: [],
  posts: [],
  linkWith: function(postId) {
    return _.find(this.posts, { id: postId });
  }
};

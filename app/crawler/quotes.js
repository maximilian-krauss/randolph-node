var _ = require('lodash'),
    buzzwords = require('../../buzzwords.json'),
    rx = /[^\.!\?]+[\.!\?]+/g;

var _sentenceContainsBuzzword = function(sentence) {
  var normalized_sentence = sentence.toLowerCase();

  for(var index = 0; index < buzzwords.length; index++) {
    if(normalized_sentence.indexOf(buzzwords[index].toLowerCase()) > -1) {
      return {
        match: true,
        matchedBuzzword: buzzwords[index].toLowerCase()
      };
    }
  }
  return {
    match: false
  }
};

module.exports = function(posts, cb) {
  var quotes = [];
  _.forEach(posts, function(post) {

    var sentences = post.content.match(rx);
    _.forEach(sentences, function(sentence) {
      var matchResult = _sentenceContainsBuzzword(sentence);

      if(matchResult.match) {
        quotes.push({
          text: sentence.trim(),
          postReference: post.id,
          matchedBuzzword: matchResult.matchedBuzzword
        });
      }
    });

  });

  cb(null, quotes);
};

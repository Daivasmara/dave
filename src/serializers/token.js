const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const TokenSerializer = new JSONAPISerializer('tokens', {
  attributes: ['access_token', 'refresh_token'],
});

module.exports = TokenSerializer;

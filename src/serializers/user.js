const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const UserSerializer = new JSONAPISerializer('users', {
  attributes: ['username', 'email', 'role', 'hashed_password', 'refresh_token', 'createdAt', 'updatedAt'],
});

module.exports = UserSerializer;

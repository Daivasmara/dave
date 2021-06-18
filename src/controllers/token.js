const { User } = require('models');
const { TokenSerializer } = require('serializers');

class TokenController {
  static async refreshAccessToken(req, res, next) {
    try {
      const { body } = req;

      const { value: { refresh_token }, error } = User.validateRefreshAccessTokenPayload(body);
      if (error) {
        res.status(400);
        throw error;
      }

      const user = await User.validateRefreshToken(refresh_token);
      const accessToken = await User.refreshAccessToken(user, refresh_token);

      res.json(TokenSerializer.serialize({ access_token: accessToken }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TokenController;

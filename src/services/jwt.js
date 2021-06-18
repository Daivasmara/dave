const jwt = require('jsonwebtoken');
const { ENVIRONMENT } = require('helpers/constants');

const { NODE_ENV, SECRET_KEY, SECRET_REFRESH_KEY } = process.env;

const accessTokenExp = NODE_ENV === ENVIRONMENT.production ? '1m' : '1d';

class JWT {
  static generateJWTPayload(userData) {
    const payload = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      role: userData.role,
    };

    return payload;
  }

  static async generateToken(user, secret = SECRET_KEY, expiresIn = accessTokenExp) {
    return jwt.sign(this.generateJWTPayload(user), secret, { expiresIn });
  }

  static async generateRefreshToken(user) {
    return this.generateToken(user, SECRET_REFRESH_KEY, '200d');
  }

  static async verifyToken(token, secret = SECRET_KEY) {
    return jwt.verify(token, secret);
  }

  static async verifyRefreshToken(token) {
    return this.verifyToken(token, SECRET_REFRESH_KEY);
  }
}

module.exports = JWT;

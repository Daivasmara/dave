const { JWT } = require('services');
const { ROLES } = require('helpers/constants');

const auth = (roles = Object.values(ROLES)) => (
  async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error();
      }

      const token = authHeader.split(' ')[1];

      const user = await JWT.verifyToken(token);
      if (!roles.includes(user.role)) {
        throw new Error();
      }
      req.user = user;
      req.isAdmin = user.role === ROLES.admin;

      next();
    } catch (err) {
      res.status(401);
      next(new Error('Unauthorized'));
    }
  }
);

module.exports = auth;

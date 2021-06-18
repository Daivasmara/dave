const { User } = require('models');
const { UserSerializer, TokenSerializer } = require('serializers');

class UserController {
  static async getAll(req, res, next) {
    try {
      if (!req.isAdmin) {
        next();
        return;
      }

      const users = await User.find({});

      res.json(UserSerializer.serialize(users));
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.user;
      const users = await User.findOne({ _id: id });

      res.json(UserSerializer.serialize(users));
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOneAndDelete({ _id: id });
      if (!user) {
        res.status(422);
        throw new Error("Resource doesn't exist");
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async patchOne(req, res, next) {
    try {
      const { params: { id }, body } = req;

      const { value, error } = User.validateUpdatePayload(body);
      if (error) {
        res.status(400);
        throw error;
      }

      const user = await User.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!user) {
        res.status(422);
        throw new Error("Resource doesn't exist");
      }

      res.json(UserSerializer.serialize(user));
    } catch (err) {
      next(err);
    }
  }

  static async signUp(req, res, next) {
    try {
      const { body } = req;

      const { value, error } = User.validateSignUpPayload(body);
      if (error) {
        res.status(400);
        throw error;
      }

      const hashedPassword = await User.hashPassword(value.password);

      const user = await User.create({
        ...value,
        hashed_password: hashedPassword,
      });

      res.status(201).json(UserSerializer.serialize(user));
    } catch (err) {
      next(err);
    }
  }

  static async logIn(req, res, next) {
    try {
      const { body } = req;

      const { value, error } = User.validateLoginPayload(body);
      if (error) {
        res.status(400);
        throw error;
      }

      const user = await User.findOne({ username: value.username });
      if (!user) {
        res.status(403);
        throw new Error('Wrong username or password');
      }

      const isPasswordValid = await user.checkIsPasswordValid(value.password);
      if (!isPasswordValid) {
        res.status(403);
        throw new Error('Wrong username or password');
      }

      const tokens = await user.generateJWTS();

      res.json(TokenSerializer.serialize(tokens));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;

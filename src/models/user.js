/* eslint-disable func-names, prefer-arrow-callback */
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { JWT } = require('services');
const { ROLES } = require('helpers/constants');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 22,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ROLES.user,
    enum: Object.values(ROLES),
    required: true,
  },
  refresh_token: {
    type: String,
  },
}, { timestamps: true });

userSchema.methods.checkIsPasswordValid = async function (password) {
  return bcrypt.compare(password, this.hashed_password);
};

userSchema.methods.generateJWTS = async function () {
  const accessToken = await JWT.generateToken(this);
  const refreshToken = await JWT.generateRefreshToken(this);

  this.refresh_token = refreshToken;
  this.save();
  return { access_token: accessToken, refresh_token: refreshToken };
};

userSchema.statics.passwordRegex = function () {
  return new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
};

userSchema.statics.hashPassword = async function (password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

userSchema.statics.validateRefreshToken = async function (refreshToken) {
  return JWT.verifyRefreshToken(refreshToken);
};

userSchema.statics.refreshAccessToken = async function (userPayload, refreshToken) {
  const user = await this.findOne({ id: userPayload.id });
  if (user.refresh_token !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  return JWT.generateToken(user);
};

userSchema.statics.validateUsername = function () {
  return (
    Joi.string()
      .alphanum()
      .min(8)
      .max(22)
      .required()
  );
};

userSchema.statics.validateEmail = function () {
  return Joi.string().email().required();
};

userSchema.statics.validateRole = function () {
  return Joi.string().valid(...Object.values(ROLES)).required();
};

userSchema.statics.validatePassword = function () {
  return (
    Joi.string()
      .pattern(this.passwordRegex())
      .messages({
        'string.pattern.base': 'Password must contain minimum eight characters, at least one letter, one number and one special character',
      })
      .required()
  );
};

userSchema.statics.validateRefreshToken = function () {
  return Joi.string().required();
};

userSchema.statics.validateLoginPayload = function ({ username, password }) {
  const schema = Joi.object({
    username: this.validateUsername(),
    password: this.validatePassword(),
  });

  return schema.validate({ username, password });
};

userSchema.statics.validateSignUpPayload = function ({
  username,
  email,
  password,
  confirm_password,
}) {
  const schema = Joi.object({
    username: this.validateUsername(),
    email: this.validateEmail(),
    password: this.validatePassword(),
    confirm_password: Joi.ref('password'),
  }).with('password', 'confirm_password');

  return schema.validate({
    username,
    email,
    password,
    confirm_password,
  });
};

userSchema.statics.validateUpdatePayload = function ({ username, email, role }) {
  const schema = Joi.object({
    username: this.validateUsername(),
    email: this.validateEmail(),
    role: this.validateRole(),
  });

  return schema.validate({ username, email, role });
};

userSchema.statics.validateRefreshAccessTokenPayload = function ({ refresh_token }) {
  const schema = Joi.object({
    refresh_token: this.validateRefreshToken(),
  });

  return schema.validate({ refresh_token });
};

const User = mongoose.model('User', userSchema);

module.exports = User;

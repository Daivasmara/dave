const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('middlewares/auth');
const errorHandler = require('middlewares/errorHandler');
const notFound = require('middlewares/notFound');

module.exports = {
  cors,
  helmet,
  morgan,
  auth,
  errorHandler,
  notFound,
};

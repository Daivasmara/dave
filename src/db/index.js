const mongoose = require('mongoose');

const {
  DB_SERVER,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

class DB {
  static init() {
    mongoose.connect(`mongodb://${DB_SERVER}:27017/${DB_NAME}`, {
      auth: {
        user: DB_USERNAME,
        password: DB_PASSWORD,
      },
      authSource: 'admin',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    // eslint-disable-next-line no-console
    }).catch((err) => console.error(err));
    // eslint-disable-next-line no-console
    this.connection.on('error', console.error.bind(console, 'connection error:'));
    // eslint-disable-next-line no-console
    this.connection.once('open', () => console.log(`Database connection established: ${DB_NAME}`));
  }

  static get connection() {
    return mongoose.connection;
  }
}

module.exports = DB;

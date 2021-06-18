require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const {
  cors,
  helmet,
  morgan,
  errorHandler,
  notFound,
} = require('middlewares');
const DB = require('db');
const { v1 } = require('versions');
const { ENVIRONMENT } = require('helpers/constants');
const swaggerDocument = require('docs/swagger.json');

const { NODE_ENV, PORT } = process.env;

const app = express();

DB.init();

app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === ENVIRONMENT.production ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/v1', v1);

app.use(notFound);
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

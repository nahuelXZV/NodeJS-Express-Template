const { logError, errorHandler, boomErrorHandler, ormErrorHandler, } = require('./middleware/errorHandler');
const mainRouter = require('./network/mainRouter'); // Load mainRouter
const corsOptions = require('./libs/utils/cors');
const config = require('./config/config');
const express = require('express'); // Load Express
const bodyParser = require('body-parser'); // Load body-parser
const cors = require('cors');

const app = express();
const port = config.PORT;

// Rutas
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors(corsOptions)); // Enable CORS
require('./libs/auth'); // Load auth
app.get('/', (req, res) => res.send('The server is running!'));
mainRouter(app);

// Middlewares
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`${config.APP_NAME} listening on port ${config.APP_URL}`)
);

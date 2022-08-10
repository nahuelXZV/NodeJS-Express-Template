require("dotenv").config();
const express = require('express');
const mainRouter = require('./network/mainRouter');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.APP_PORT || 3000;

// Rutas
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
mainRouter(app);
app.use(errorHandler.logError);
app.use(errorHandler.errorHandler);


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));

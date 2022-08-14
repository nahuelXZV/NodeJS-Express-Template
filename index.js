require("dotenv").config();
const express = require('express');
const mainRouter = require('./network/mainRouter');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Rutas
app.use(bodyParser.json());

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    const existe = whiteList.some(dominio => dominio === origin);
    if (existe || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(corsOptions));
app.get('/', (req, res) => res.send('Hello World!'));
mainRouter(app);
app.use(errorHandler.logError);
app.use(errorHandler.boomErrorHandler);
app.use(errorHandler.errorHandler);


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));

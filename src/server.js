const express = require("express");
require("./db/connection");

const cors = require("cors");
const checkJwt = require("./middleware/auth");

const userRouter = require("./routers/userRouter");
const imageRouter = require("./routers/imageRouter");
const testRouter = require("./routers/testRouter");
const logoRouter = require("./routers/logoRouter");
const backgroundRouter = require("./routers/backgroundRouter");

// Create a new Express app
const app = express();
const port = process.env.PORT || 5001;

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 5000 }));

// Accept cross-origin requests from the frontend app
app.use(cors({ origin: ['http://localhost:' + port, 'http://localhost:3000', 'https://www.alwera.pl'] }));
app.use(express.json());

//######### ROUTERS ############
app.use(userRouter);
app.use(imageRouter);
app.use(testRouter);
app.use(logoRouter);
app.use(backgroundRouter);




// Start the app
app.listen(port, () => console.log('API listening on ' + port));
const express = require("express");
require("./db/connection");

const cors = require("cors");
const checkJwt = require("./middleware/auth");

const userRouter = require("./routers/userRouter");
const imageRouter = require("./routers/imageRouter");
const testRouter = require("./routers/testRouter");

// Create a new Express app
const app = express();
const port = process.env.PORT || 5002;

// Accept cross-origin requests from the frontend app
app.use(cors({ origin: ['http://localhost:' + port, 'http://localhost:3000', 'https://www.alwera.pl'] }));
app.use(express.json());

//######### ROUTERS ############
app.use(userRouter);
app.use(imageRouter);
app.use(testRouter);


// Start the app
app.listen(port, () => console.log('API listening on ' + port));
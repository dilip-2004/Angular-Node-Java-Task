const express = require('express');
const cors = require('cors');
const calculationRouter = require('./routes/calculation.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/calculate', calculationRouter);

app.use(errorMiddleware);

module.exports = app;
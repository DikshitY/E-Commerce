const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const AppError = require('./utils/AppError');
const userRouter = require('./routes/user.routes')

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/', (req,res) => {
  res.send('Welcome to the E-Commerece API.')
})
app.use('/api/v1/users', userRouter)


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.err
  });
});

module.exports = app;

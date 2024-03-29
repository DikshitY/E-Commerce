const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const AppError = require('./utils/AppError');
const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const cartRouter = require('./routes/cart.routes')
const razorpayRouter = require('./routes/razorpay.routes')
const fileUpload = require('express-fileupload')

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(fileUpload({
  useTempFiles: true
}))

app.get('/', (req,res) => {
  res.json("Welcome to the E-Commerce API.")
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/razorpay', razorpayRouter)


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

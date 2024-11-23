const express = require('express');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const addressRouter = require('./routes/addressRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const adminRouter = require('./routes/adminRoutes');
const cors = require('cors');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const mongooseErrorHandler = require('./middlewares/mongooseErrorHandler');
const app = express();

// app.use(express.urlencoded({extended: true}));
app.use(express.json());

//allow frontend
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)

//routes
app.use('/api/store', productRouter)
app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)
app.use('/api/address', addressRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/admin', adminRouter)

//mongoose error handler
app.use(mongooseErrorHandler);

//global error handler
app.use(globalErrorHandler);
module.exports = app;
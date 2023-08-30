const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors')
const bodyParser = require('body-parser');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const { seedUser } = require('./controllers/seedController');
const seedRouter = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responceController');
const authRouter = require('./routers/authRouter');
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');
const shopRouter = require('./routers/shopRouter');
const orderRouter = require('./routers/orderRouter');
const app = express();

const rateLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 5,
    message: 'Too many requests from this IP. please try again later',
})

app.use(xssClean());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use('/api/users',userRouter)
app.use('/api/seed',seedRouter)
app.use('/api/auth',authRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/shop',shopRouter)
app.use('/api/order',orderRouter)

const isloggedin = (req,res,next) =>{
    const login = true;
    if(login){
        req.body.id = 101;
        next();
    } else{
        return res.status(401).json({
            message: 'You are not logged in'
        })
    }
    console.log('isLoggedin middleware');
}


app.get('/test', rateLimiter, (req,res)=>{
    res.status(200).send({
        message: 'test is return'
    })
})
app.get('/', (req,res)=>{
    res.status(200).send({
        message: 'Api testing working fine'
    })
})

//client error handling

app.use((req, res, next)=>{
    // res.status(404).json({
    //     message: 'Invalid API'
    // })
    
    next(createError(404, 'Invalid API'));
})
//server error handling

app.use((err, req, res, next)=>{
    return errorResponse(res, {
        statusCode: err.status,
        message:err.message
    })
})

module.exports = app;


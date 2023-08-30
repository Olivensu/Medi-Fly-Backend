const express = require('express');
const {mongoose} = require("mongoose");
const User = require('../models/userModel');
const createHttpError = require('http-errors');
const { successResponse } = require('../controllers/responceController');
const orderRouter = express.Router();

orderRouter.post('/order',async(req, res, next) => {

})
orderRouter.post('/cart', async(req, res,next) => {
    try {
        // const {id, status, email} = req.body;
        const {product, email} = req.body;
        const user = await User.findOne({email:email})
        console.log(user);
        if(!user){
            throw createHttpError(404, 'User not found')
        }
        user.products.push({cartItem: product})
        await user.save();

        return successResponse(res, {
            statusCode: 200,
            message: `Added to cart`,
            payload: user.products
        })

    } catch (error) {
        next(error)
    }
})

orderRouter.get('/cart/:email', async(req, res, next) => {
    try {
        // console.log(req.user);
        const email = req.params.email;
        console.log(email)
        // const options = {password:0};
        const user = await User.findOne({email:email});

        if(!user){
            throw createError(404, 'User not found');
        }

    return successResponse(res, {
        statusCode: 200,
        message: 'user profile is return',
        payload: user.products
    })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

module.exports = orderRouter;
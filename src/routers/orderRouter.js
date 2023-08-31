const express = require('express');
const {mongoose} = require("mongoose");
const User = require('../models/userModel');
const createHttpError = require('http-errors');
const { successResponse } = require('../controllers/responceController');
const orderRouter = express.Router();

orderRouter.post('/checkout',async(req, res, next) => {
    try {
        // const {id, status, email} = req.body;
        const {order,email} = req.body;
        const user = await User.findOne({email:email})
        console.log(order);
        if(!user){
            throw createHttpError(404, 'User not found')
        }
        user.orders.push({order: order})
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
orderRouter.post('/cart', async(req, res,next) => {
    try {
        // const {id, status, email} = req.body;
        const {product,quantity, email} = req.body;
        const user = await User.findOne({email:email})
        console.log(user);
        if(!user){
            throw createHttpError(404, 'User not found')
        }
        user.products.push({cartItem: product, quantity:quantity})
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

orderRouter.get('/order/:email', async(req, res, next) => {
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
        payload: user.orders
    })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createError(400, 'Invalid User Id'))
            return;
        }
        next(error)
    }
})

orderRouter.put('/cart/quantity', async (req, res, next) => {
    try {
      const { id, quantity, email } = req.body;
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        throw createHttpError(404, 'User not found');
      }
  
      // Find the index of the product with the matching id in the user's products array
      const productIndex = user.products.findIndex(product => product.id === id);
  
      if (productIndex === -1) {
        throw createHttpError(404, 'Product not found in user\'s cart');
      }
  
      // Update the quantity of the matching product
      user.products[productIndex].quantity = quantity;
  
      await user.save();
  
      return successResponse(res, {
        statusCode: 200,
        message: `Updated product quantity in cart`,
        payload: user.products[productIndex] // Return the updated product
      });
  
    } catch (error) {
      next(error);
    }
  });

orderRouter.delete('/cart', async (req, res, next) => {
    try {
      const { id,email } = req.body;
      console.log(req.body);
      const user = await User.findOne({ email: email });
  
      if (!user) {
        throw createHttpError(404, 'User not found');
      }
  
      // Find the index of the item with the matching id in the user's items array
    const itemIndex = user.products.findIndex(item => item._id.toString() === id);

    if (itemIndex === -1) {
      throw createHttpError(404, 'Item not found');
    }

    // Remove the item from the array
    user.products.splice(itemIndex, 1);

    await user.save();
  
      return successResponse(res, {
        statusCode: 200,
        message: `Updated product quantity in cart`,
        payload: user.products // Return the updated product
      });
  
    } catch (error) {
      next(error);
    }
  });
  

module.exports = orderRouter;
const slugify = require('slugify')
const createHttpError = require("http-errors");
const { successResponse } = require("./responceController");
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require('../services/categoryService');
const { createProduct } = require('../services/productService');
const Product = require('../models/productModel');
const Shop = require('../models/shopModel');


const handleCreateShop = async(req, res, next) =>{
    try {
        const {name,email,description,phone,city,zip} = req.body;

        const image = req.file;

        if(!image){
            throw createError(404, 'Image not found')
        }
        if(image.size>1024*1024*2){
            throw createError(400, 'Image size is too large')
        }
        const imagefile = image.filename;
        
        const newShop = await Shop.create({name: name,email: email,phone:phone, slug: slugify(name),city:city,zip:zip,description:description,image: imagefile })
        if(!newShop){
            throw createError(409, 'Shop is not created')
        }
    return successResponse(res, {
        statusCode: 201,
        message: `Shop Created successfully`,
        payload: newShop,
    })
    } catch (error) {
        next(error)
    }
}

const handleGetShops = async(req, res, next) =>{
    try {
        // const {name} = req.body;

        const newShop = await Shop.find({})
    if(!newShop){
        throw createHttpError(400, 'Shop not found')
    }

        if(!newShop){
            throw createHttpError(400, 'Shop not found')
        }
        
    return successResponse(res, {
        statusCode: 200,
        message: `Shop get successfully`,
        payload: newShop,
    })
    } catch (error) {
        next(error)
    }
}

const handleGetShop = async(req, res, next) =>{
    try {
        const {slug} = req.params;

        const shop = await Shop.find({slug});
    if(!shop){
        throw createHttpError(400, 'Shop not found')
    }
    return successResponse(res, {
        statusCode: 200,
        message: `Shop get successfully`,
        payload: shop,
    })
    } catch (error) {
        next(error)
    }
}
const handleGetShopByUser = async(req, res, next) =>{
    try {
        const {email} = req.params;

        const shop = await Shop.find({email});
    if(!shop){
        throw createHttpError(400, 'Shop not found')
    }
    return successResponse(res, {
        statusCode: 200,
        message: `Shop get successfully`,
        payload: shop,
    })
    } catch (error) {
        next(error)
    }
}

const handleUpdateShop = async(req, res, next) =>{
    try {
        const {slug} = req.params;
        
        const options = {new: true, runValidators:true, context: 'query'};
        let update = {};
        const allowedFields = ['name','email','phone','city','zip', 'description',];

        for(const key in req.body){
            if(allowedFields.includes(key)){
                update[key] = req.body[key];
            }
        }

        const image = req.file;

        if(image){
            if(!image){
                throw createError(404, 'Image not found')
            }
            if(image.size>1024*1024*2){
                throw createError(400, 'Image size is too large')
            }
            update.image = req.file.filename;
        }
        if(update.name){
            update.slug = slugify(update.name)
        }

        // delete update.email;
        const updateShop = await Shop.findOneAndUpdate({slug}, update,options)
        if(!updateShop){
            throw createError(404, 'Shop with this slug does not exist')
        }
    return successResponse(res, {
        statusCode: 200,
        message: `Shop update successfully`,
        payload: updateShop,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleDeleteShop = async(req, res, next) =>{
    try {
        const {slug} = req.params;

        const newDeleteShop = await Shop.findOneAndDelete({slug})
    if(!newDeleteShop){
        throw createHttpError(400, 'Shop not found')
    }
    return successResponse(res, {
        statusCode: 200,
        message: `Shop deleted successfully`,
        payload: newDeleteShop,
    })
    } catch (error) {
        
        next(error)
    }
}

module.exports = {handleCreateShop,handleGetShops,handleGetShopByUser, handleGetShop, handleUpdateShop,handleDeleteShop}
const slugify = require('slugify')
const createHttpError = require("http-errors");
const { successResponse } = require("./responceController");
const Category = require('../models/categoryModel');
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require('../services/categoryService');
const { createProduct } = require('../services/productService');
const Product = require('../models/productModel');


const handleCreateProduct = async(req, res, next) =>{
    try {
        const {name,description,price,shop,discountPrice,shipping,quantity,category} = req.body;

        const image = req.file;

        if(!image){
            throw createError(404, 'Image not found')
        }
        if(image.size>1024*1024*2){
            throw createError(400, 'Image size is too large')
        }
        const imagefile = image.filename;
        
        const newProduct = await Product.create({name: name, slug: slugify(name),shop:shop,price:price,discountPrice:discountPrice,description:description,shipping:shipping, quantity:quantity,category: category,image: imagefile })
        if(!newProduct){
            throw createError(409, 'Product is not created')
        }
    return successResponse(res, {
        statusCode: 201,
        message: `Category Product successfully`,
        payload: newProduct,
    })
    } catch (error) {
        next(error)
    }
}

const handleGetProducts = async(req, res, next) =>{
    try {
        // const {name} = req.body;

        const newProduct = await Product.find({})
    if(!newProduct){
        throw createHttpError(400, 'Product not found')
    }

        if(!newProduct){
            throw createHttpError(400, 'Product not found')
        }
        
    return successResponse(res, {
        statusCode: 200,
        message: `Product get successfully`,
        payload: newProduct,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleGetProduct = async(req, res, next) =>{
    try {
        const id = req.params.id;

        const product = await Product.findById(id);
    if(!product){
        throw createHttpError(400, 'Product not found')
    }
    return successResponse(res, {
        statusCode: 200,
        message: `Product get successfully`,
        payload: product,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleUpdateProduct = async(req, res, next) =>{
    try {
        const id = req.params.id;
        
        const options = {new: true, runValidators:true, context: 'query'};
        let update = {};
        const allowedFields = ['name', 'description', 'price', 'category', 'discountPrice','shipping','quantity',];

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
        const updateProduct = await Product.findByIdAndUpdate(id, update,options)
        if(!updateProduct){
            throw createError(404, 'Product with this slug does not exist')
        }
    return successResponse(res, {
        statusCode: 200,
        message: `Product update successfully`,
        payload: updateProduct,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleDeleteProduct = async(req, res, next) =>{
    try {
        const id = req.params.id;

        const newDeleteProduct = await Product.findByIdAndDelete(id)
    if(!newDeleteProduct){
        throw createHttpError(400, 'Product not found')
    }
    return successResponse(res, {
        statusCode: 200,
        message: `Product deleted successfully`,
        payload: newDeleteProduct,
    })
    } catch (error) {
        
        next(error)
    }
}

module.exports = {handleCreateProduct,handleGetProducts, handleGetProduct, handleUpdateProduct,handleDeleteProduct}
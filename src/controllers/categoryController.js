const slugify = require('slugify')
const createHttpError = require("http-errors");
const { successResponse } = require("./responceController");
const Category = require('../models/categoryModel');
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require('../services/categoryService');


const handleCreateCategory = async(req, res, next) =>{
    try {
        const {name} = req.body;

        const newCategory = await createCategory(name)
        
    return successResponse(res, {
        statusCode: 201,
        message: `Category Created successfully`,
        payload: newCategory,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleGetCategories = async(req, res, next) =>{
    try {
        // const {name} = req.body;

        const category = await getCategories()

        if(!category){
            throw createHttpError(400, 'Category not found')
        }
        
    return successResponse(res, {
        statusCode: 200,
        message: `Category get successfully`,
        payload: category,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleGetCategory = async(req, res, next) =>{
    try {
        const {slug} = req.params;

        const category = await getCategory(slug)
        
        if(!category){
            throw createHttpError(400, 'Category not found')
        }
    return successResponse(res, {
        statusCode: 200,
        message: `Category get successfully`,
        payload: category,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleUpdateCategory = async(req, res, next) =>{
    try {
        const {slug} = req.params;
        const {name} = req.body;

        const category = await updateCategory(slug, name)
        
        if(!category){
            throw createHttpError(400, 'Category not found')
        }
    return successResponse(res, {
        statusCode: 200,
        message: `Category update successfully`,
        payload: category,
    })
    } catch (error) {
        
        next(error)
    }
}

const handleDeleteCategory = async(req, res, next) =>{
    try {
        const {slug} = req.params;

        const category = await deleteCategory(slug)
        
        if(!category){
            throw createHttpError(400, 'Category not found')
        }
    return successResponse(res, {
        statusCode: 200,
        message: `Category deleted successfully`,
        payload: category,
    })
    } catch (error) {
        
        next(error)
    }
}

module.exports = {handleCreateCategory,handleGetCategories, handleGetCategory, handleUpdateCategory,handleDeleteCategory}
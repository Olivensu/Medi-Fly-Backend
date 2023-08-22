const slugify = require('slugify')
const createHttpError = require("http-errors");
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');


const createProduct = async(name) =>{

    const newCategory = await Product.create({name: name, slug: slugify(name) })
    return newCategory;
}

const getCategories = async() =>{

    const newCategory = await Category.find({})
    if(!newCategory){
        throw createHttpError(400, 'Category not found')
    }
    return newCategory;
}

const getCategory = async(slug) =>{

    const newCategory = await Category.find({slug});
    if(!newCategory){
        throw createHttpError(400, 'Category not found')
    }
    return newCategory;
}

const updateCategory = async(slug, name) =>{

    const newUpdateCategory = await Category.findOneAndUpdate({slug}, {$set: {name: name, slug: slugify(name)}}, {new: true})
    if(!newUpdateCategory){
        throw createHttpError(400, 'Category not found')
    }
    return newUpdateCategory;
}

const deleteCategory = async(slug, name) =>{

    const newDeleteCategory = await Category.findOneAndDelete({slug})
    if(!newDeleteCategory){
        throw createHttpError(400, 'Category not found')
    }
    return newDeleteCategory;
}

module.exports = {createProduct,getCategories, getCategory,updateCategory,deleteCategory}
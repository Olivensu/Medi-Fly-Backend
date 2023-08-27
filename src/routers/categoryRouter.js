const express = require('express');
const upload = require('../middlewares/uploadFile');
const runValidation = require('../validators');
const { isloggedin, isloggedOut, isAdmin } = require('../middlewares/auths');
const { handleCreateCategory, handleGetCategory, handleGetCategories, handleUpdateCategory, handleDeleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const categoryRouter = express.Router();


// post /api/category
categoryRouter.post('/create-category', validateCategory, runValidation, handleCreateCategory); // isloggedin,
categoryRouter.get('/', handleGetCategories);
categoryRouter.get('/:slug', handleGetCategory);
categoryRouter.put('/:slug', handleUpdateCategory);
categoryRouter.delete('/:slug', handleDeleteCategory);




module.exports = categoryRouter
const express = require('express');
const upload = require('../middlewares/uploadFile');
const runValidation = require('../validators');
const { isloggedin, isloggedOut, isAdmin } = require('../middlewares/auths');
const { validateCategory } = require('../validators/category');
const { handleCreateShop, handleDeleteShop, handleUpdateShop, handleGetShop, handleGetShops, handleGetShopByUser } = require('../controllers/shopController');
const shopRouter = express.Router();


// post /api/shop
shopRouter.post('/create-shop',upload.single("image"), handleCreateShop);
shopRouter.get('/', handleGetShops);
shopRouter.get('/:slug', handleGetShop);
shopRouter.get('/user/:email', handleGetShopByUser);
// categoryRouter.get('/', handleGetCategories);
// categoryRouter.get('/:slug', handleGetCategory);
shopRouter.put('/:slug',upload.single("image"), handleUpdateShop);
shopRouter.delete('/:slug', handleDeleteShop);

module.exports = shopRouter
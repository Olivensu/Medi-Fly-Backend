const express = require('express');
const runValidation = require('../validators');
const { handleLogin } = require('../controllers/authController');
const { handleLogOut } = require('../controllers/authController');
const { isloggedOut, isloggedin } = require('../middlewares/auths');
const { validateUserLogin } = require('../validators/auth');
const { handleRefreshToken } = require('../controllers/authController');
const { handleProtectedRoute } = require('../controllers/authController');
const authRouter = express.Router();



authRouter.post('/login',validateUserLogin,runValidation,  handleLogin);
// authRouter.post('/logout',isloggedin, handleLogOut);
// authRouter.get('/refresh-token', handleRefreshToken);
// authRouter.get('/protected', handleProtectedRoute);


module.exports = authRouter
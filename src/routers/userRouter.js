const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, updateUserById, banUserById, unbanUserById, handleUpdatePassword, handleForgetPassword, handleResetPassword } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const runValidation = require('../validators');
const { isloggedin, isloggedOut, isAdmin } = require('../middlewares/auths');
const userRouter = express.Router();



userRouter.post('/register',upload.single("image"),validateUserRegistration,isloggedOut, runValidation,   processRegister);
userRouter.post('/verify', isloggedOut, activateUserAccount);
userRouter.get('/', isloggedin,isAdmin, getUsers);
userRouter.get('/:id', isloggedin,  getUserById);
userRouter.put('/reset-password', handleResetPassword);
userRouter.put('/:id',upload.single("image"), isloggedin, updateUserById);
userRouter.delete('/:id',isloggedin,  deleteUserById);
userRouter.put('/ban-user/:id',isloggedin,isAdmin,  banUserById);
userRouter.put('/unban-user/:id',isloggedin,isAdmin,  unbanUserById);
userRouter.put('/update-password/:id',isloggedin, handleUpdatePassword);
userRouter.post('/forget-password', handleForgetPassword);



module.exports = userRouter
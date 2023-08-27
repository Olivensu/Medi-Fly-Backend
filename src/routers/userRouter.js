const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, updateUserById, banUserById, unbanUserById, handleUpdatePassword, handleForgetPassword, handleResetPassword } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const runValidation = require('../validators');
const { isloggedin, isloggedOut, isAdmin } = require('../middlewares/auths');
const userRouter = express.Router();



userRouter.post('/register',upload.single("image"), validateUserRegistration, runValidation,   processRegister);
// userRouter.post('/verify', isloggedOut, activateUserAccount);
userRouter.get('/',  getUsers); // isloggedin,isAdmin,
// userRouter.get('/:id',  getUserById); // isloggedin,
userRouter.get('/:email',  getUserById); // isloggedin,
userRouter.put('/reset-password', handleResetPassword);
userRouter.put('/:id',upload.single("image"), updateUserById);
userRouter.delete('/:id',  deleteUserById);
userRouter.put('/ban-user/:id',  banUserById);
userRouter.put('/unban-user/:id',  unbanUserById);
userRouter.put('/update-password/:id', handleUpdatePassword);
userRouter.post('/forget-password', handleForgetPassword);



module.exports = userRouter
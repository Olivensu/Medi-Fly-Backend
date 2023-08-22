const {body} = require("express-validator")

// login validation
const validateCategory = [
    body('name').trim().notEmpty().withMessage("Category name is required")
];




// sign in validation


module.exports = {validateCategory};
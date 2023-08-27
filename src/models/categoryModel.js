const {Schema, model} = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        minlength: [3, 'The length of Category name can be minimum 3 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Category slug is required'],
        lowercase: true,
        unique: true,
    },
    // image: {
    //     type: String,
    //     // contentType: String,
    //     // defaultImgPath: defaultImgURL
    // },
    // totalRating: {
    //     type: Number,
    //     default: 0,
    // },
    // ratingAverage: {
    //     type: Number,
    //     default: 0,
    // }
    
}, {timestamps: true});

const Category = model('Category', categorySchema);

module.exports = Category;
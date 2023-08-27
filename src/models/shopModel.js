const {Schema, model} = require("mongoose");

// name, slug, description, price, quantity, sold, shipping, discountPrice, image,
const shopSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Shop name is required'],
        trim: true,
        minlength: [3, 'The length of Shop name can be minimum 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Shop email is required'],
    },
    phone: {
        type: Number,
        required: [true, 'Shop phone is required'],
    },
    city: {
        type: String,
        required: [true, 'Shop city is required'],
    },
    zip: {
        type: Number,
        required: [true, 'Shop zip is required'],
    },
    slug: {
        type: String,
        required: [true, 'Shop slug is required'],
        lowercase: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Shop description is required'],
        trim: true,
    },
    image: {
        type: String,
        // contentType: String,
        // defaultImgPath: defaultImgURL
    },
    isShow: {
        type: Boolean,
        default: true,
    },
    isTrending: {
        type: Boolean,
        default: false,
    },
    isPopular: {
        type: Boolean,
        default: false,
    },
    isFlashSale: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const Shop = model('Shop', shopSchema);

module.exports = Shop;
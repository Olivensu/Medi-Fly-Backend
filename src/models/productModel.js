const {Schema, model} = require("mongoose");

// name, slug, description, price, quantity, sold, shipping, discountPrice, image,
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'The length of Product name can be minimum 3 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Product slug is required'],
        lowercase: true,
    },
    shop: {
        type: String,
        required: [true, 'Product shop is required'],
    },
    shopSlug: {
        type: String,
        required: [true, 'Product shop is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        validate: {
            validator:(v)=>{
                return v > 0;
            },
            message: (props)=>{
                `${props.value} is not a valid number. Price must be greater than 0`
            }
        },
        
    },
    discountPrice: {
        type: Number,
        required: [true, 'Product discountPrice is required'],
        validate: {
            validator:(v)=>{
                return v > 0;
            },
            message: (props)=>{
                `${props.value} is not a valid number. Price must be greater than 0`
            }
        },
    },
    shipping: {
        type: Number,
        required: [true, 'Product shipping is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    sold: {
        type: Number,
        required: [true, 'Product quantity is required'],
        default: 0,
    },
    image: {
        type: String,
        // contentType: String,
        // defaultImgPath: defaultImgURL
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    isAvailable: {
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

const Product = model('Product', productSchema);

module.exports = Product;
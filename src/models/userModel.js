const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultImgURL } = require("../secret");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercast: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
            message: 'Email validation failed'
        }
    },
    password: {
        type: String,
        required: true, //[true, 'User password is required'],
        minlength: [6, 'The length of user name can be minimum 6 characters'],
        set: (v)=>bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
        type: String,
        required: false,
        // contentType: String,
        // defaultImgPath: defaultImgURL
    },
    address: {
        type: String,
        required: [true, 'User address is required'],
    },
    phone: {
        type: String,
        required: [true, 'User phone is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

const User = model('Users', userSchema);

module.exports = User;
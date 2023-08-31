
const {Schema, model,mongoose} = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultImgURL } = require("../secret");

// Define the products schema
const products = new Schema({
    cartItem: {
        type: mongoose.Schema.Types.Mixed, // Store any type of data
      },
    quantity:{
        type: Number,
        required: true,
      }
  }, {timestamps: true});
// Define the order schema
const order = new Schema({
    order: {
        type: mongoose.Schema.Types.Mixed, // Store any type of data
      },
      status: {
        type: String,
        default: 'Ordered'
      }
  }, {timestamps: true});

// Define the products schema
const newAddress = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
      },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  }, );

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
    newAddress:[newAddress],
    products:[products],
    orders:[order]
}, {timestamps: true});

const User = model('Users', userSchema);

module.exports = User;
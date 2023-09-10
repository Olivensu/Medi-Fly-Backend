
const {Schema, model,mongoose} = require("mongoose");


// Define the order schema
// const order = new Schema({
//     order: {
//         type: mongoose.Schema.Types.Mixed, // Store any type of data
//       },
//   }, {timestamps: true});


const orderSchema = new Schema({
    orders:{
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'orders is required'],
    },
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
    email: {
        type: String,
        required: [true, 'User email is required'],
    },
    status: {
        type: String,
        default: 'Ordered'
      }

}, {timestamps: true});

const Order = model('Orders', orderSchema);

module.exports = Order;
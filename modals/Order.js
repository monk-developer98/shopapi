const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    products:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    amount:{
        type:Number,
        required:true
    },
    address:{ type:Object, required:true},
    status:{typr:String, default:"pending"},
}, { timestamps:true})

const Order = new mongoose.model("Order" , orderSchema);

module.exports = Order;
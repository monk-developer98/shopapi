const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{ type: String, required:true, unique:true },
    desc: { type:String, required:true},
    img: {type:String},
    categories: {type: Array},
    size:{type:String},
    color:{type:String},
    price:{type:Number, required:true}
}, { timestamps:true })

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
const mongoose = require('./mongodb-connect')

let productsSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    user_id:{
        type:String,
        required:true
    },
    user_nombre:{
        type:String,
        required:true
    }
});

let Products = mongoose.model('products', productsSchema);

module.exports = Products;
const mongoose = require('./mongodb-connect')

let productsSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    condicion: {
        type: String,
        required: true
    },
    uso: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    user_id:{
        type:String,
        required:true
    },
    user_nombre:{
        type:String,
        required:true
    },
    user_apellido:{
        type:String,
        required:true
    },
    ofertador:{
        type:String,
    }
});

let Products = mongoose.model('products', productsSchema);

module.exports = Products;
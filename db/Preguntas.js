const mongoose = require('./mongodb-connect')

let preguntaSchema =mongoose.Schema({
    pregunta:{
        type:String,
        require:true
    },
    respuesta:{
        type:String,
        require:true
    }
});
let Preguntas = mongoose.model('preguntas',preguntaSchema);

module.exports=Preguntas;
var mongoose = require('mongoose');

// Schema equipos
var eventoSchema = mongoose.Schema({
    descripcion:{
        type: String,
        required: true
    },
    tiempo:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('evento', eventoSchema);

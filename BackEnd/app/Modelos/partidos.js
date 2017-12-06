var mongoose = require('mongoose');

// Schema partidos
var partidoSchema = new mongoose.Schema({
    equipos:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'equipo'
    }],
    eventos:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'evento'
    }],
    fecha_inicio:{
        type:String,
        required: true
    },
    hora_inicio:{
        type:String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('partido', partidoSchema);

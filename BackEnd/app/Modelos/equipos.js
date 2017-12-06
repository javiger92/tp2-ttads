var mongoose = require('mongoose');

// Schema equipos
var equipoSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('equipo', equipoSchema);

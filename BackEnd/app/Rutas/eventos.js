var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var router = require('express').Router();
var bodyParser = require('body-parser');
var Evento = mongoose.model('evento');
var Partido = mongoose.model('partido');

// GET ALL EVENTOS
router.get('/', (req, res) => {
  Evento.find({})
    .then(eventos => {
      if(!eventos){ return res.sendStatus(401); }
      return res.json({'eventos': eventos})
  })
});

// GET EVENTO BY ID
router.get('/:_id', (req, res) => {
  let _id = req.params._id;
  Evento.findById(_id)
    .then(eventos => {
      if(!eventos){ return res.sendStatus(401); }
      return res.json({'eventos': eventos})
  })
});

// POST EVENTO
router.post('/', (req, res) => {
  let evento = new Evento(req.body);
  id = req.body.id_partido;
  console.log(id);
  evento.save()
    .then(Partido.findOne({"_id": id}).then(partido =>{
       if(!partido){ return res.sendStatus(401); }
       else{
       partido.eventos.push(evento);
       partido.save();
       return res.json({'evento': evento})
     }
  }));
});

//UPDATE EVENTO
router.put('/:_id', (req, res) => {
  let _id = req.params._id;
  let partido = req.body.partido;
  let descripcion = req.body.descripcion;
  let equipo = req.body.equipo;
  let tiempo = req.body.tiempo;
  Evento.findOneAndUpdate({ "_id": _id }, { "$set": {"partido": partido, "descripcion": descripcion, "equipo": equipo, "tiempo": tiempo }})
    .then(eventos => {
      if(!eventos){ return res.sendStatus(401); }
      return res.json({'eventos': eventos})
  })
});

//DELETE EVENTO
router.delete('/:_id', (req, res) => {
  let _id = req.params._id;
  Evento.findByIdAndRemove(_id)
   .then(eventos => {
    if(!eventos){ return res.sendStatus(401); }
    return res.json({'eventos': eventos})
  })
});

module.exports=router;

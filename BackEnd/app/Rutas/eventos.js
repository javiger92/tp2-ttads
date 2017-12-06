var mongoose = require('mongoose');
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
  let descripcion = req.body.descripcion;
  let tiempo = req.body.tiempo;
  let tipo = req.body.tipo;
  Evento.findOneAndUpdate({ "_id": _id }, { "$set": {"descripcion": descripcion,"tiempo": tiempo, "tipo": tipo }})
    .then(eventos => {
      if(!eventos){ return res.sendStatus(401); }
      return res.json({'eventos': eventos})
  })
});

//DELETE EVENTO
router.delete('/:_id', (req, res) => {
  let _id = req.params._id;
  Evento.findByIdAndRemove(_id)
   .then(Partido.findOne({"eventos" : _id}).then(partido => {
    if(!partido){ return res.sendStatus(401); }
    else{
        partido.eventos.pull(_id);
        partido.save();
        return res.json({'partidos': partido})
    }
  }))
});

module.exports=router;

var mongoose = require('mongoose');
var router = require('express').Router();
var bodyParser = require('body-parser');
var Equipo = mongoose.model('equipo');
var Partido = mongoose.model('partido');

// GET ALL EQUIPOS
router.get('/', (req, res) => {
  Equipo.find({})
    .then(equipos => {
      if(!equipos){ return res.sendStatus(401); }
      return res.json({'equipos': equipos})
  })
});

// GET EQUIPO BY ID
router.get('/:_id', (req, res) => {
  let _id = req.params._id;
  Equipo.findById(_id)
    .then(equipos => {
      if(!equipos){ return res.sendStatus(401); }
      return res.json({'equipos': equipos})
  })
});

// POST EQUIPO
router.post('/', (req, res) => {
  let instEquipo = new Equipo(req.body);
  id = req.body.id_partido;
  instEquipo.save()
     .then(equipos => {
        if(!equipos){ return res.sendStatus(401); }
        return res.json({'equipos': equipos})
  });
});

//UPDATE EQUIPO
router.put('/:_id', (req, res) => {
  let _id = req.params._id;
  let name=req.body.name;
  Equipo.findOneAndUpdate({ "_id": _id }, { "$set": { "name": name }})
    .then(equipos => {
      if(!equipos){ return res.sendStatus(401); }
      return res.json({'equipos': equipos})
  })
});

//DELETE EQUIPO
router.delete('/:_id', (req, res) => {
  let _id = req.params._id;
  Equipo.findByIdAndRemove(_id)
   .then(Partido.findOne({"equipos" : _id}).then(partido => {
    if(!partido){ return res.sendStatus(401); }
    else{
        partido.equipos.pull(_id);
        partido.save();
        return res.json({'partidos': partido})
    }
  }))
});

module.exports=router;

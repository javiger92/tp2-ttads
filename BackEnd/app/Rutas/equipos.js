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
  let id = req.params._id;
  Equipo.findByIdAndRemove(id)
   .then(Partido.find({"equipos" : id},{"_id" : 1}).then(partidos => {
    if(!partidos){ return res.sendStatus(401); }
    else{
        Partido.remove({"_id" : partidos }).then(function(){
           return res.json({'partidos': partidos})
        })
    }
  }))
});

module.exports=router;

var mongoose = require('mongoose');
var router = require('express').Router();
var bodyParser = require('body-parser');
var Equipo = mongoose.model('equipo');

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
   .then(equipos => {
    if(!equipos){ return res.sendStatus(401); }
    return res.json({'equipos': equipos})
  })
});

module.exports=router;

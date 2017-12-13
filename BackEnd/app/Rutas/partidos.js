var mongoose = require('mongoose');
var router = require('express').Router();
var bodyParser = require('body-parser');
var Partido = mongoose.model('partido');
var Evento = mongoose.model('evento');
var Equipo = mongoose.model('equipo');

// GET ALL PARTIDOS
router.get('/', (req, res) => {
  Partido.find({})
    .populate('eventos')
    .populate('equipos')
    .then(partidos => {
      if(!partidos){ return res.sendStatus(401); }
      return res.json({'partidos': partidos})
  })
});

// GET ALL PARTIDOS FINALIZADOS
router.get('/finalizados', (req, res) => {
  var fecha_hoy = Date.now();
  Partido.find({ "fecha_partido": {$lt: fecha_hoy} })
    .populate('eventos')
    .populate('equipos')
    .then(partidos => {
      if(!partidos){ return res.sendStatus(401); }
      return res.json({'partidos': partidos})
  })
});


// GET PARTIDO BY ID
router.get('/:_id', (req, res) => {
  let _id = req.params._id;
  Partido.findById(_id)
    .populate('eventos')
    .populate('equipos')
    .then(partidos => {
      if(!partidos){ return res.sendStatus(401); }
      return res.json({'partidos': partidos})
  })
});

// POST PARTIDO
router.post('/', (req, res) => {
  let partido = new Partido(req.body);
  var flag = 0;
  id1 = req.body.id_equipo1;
  id2 = req.body.id_equipo2;
  Equipo.findOne({"_id": id1}).then(equipo1 =>{
       if(!equipo1){ return res.sendStatus(401); }
       else{
       flag = 1;
       partido.equipos.push(equipo1);
     }
  })
  .then(Equipo.findOne({"_id": id2}).then(equipo2 =>{
     if(!equipo2){ return res.sendStatus(401); }
     else{
     if(flag === 1){
       partido.equipos.push(equipo2);
       partido.save();
       return res.json({'partido': partido})
      }
    }
  }));
});

//UPDATE PARTIDO
router.put('/:_id', (req, res) => {
  let _id = req.params._id;
  let fecha_partido = req.body.fecha_partido;
  Partido.findOneAndUpdate({ "_id": _id }, { "$set": { "fecha_partido": fecha_partido }})
    .then(partidos => {
      if(!partidos){ return res.sendStatus(401); }
      return res.json({'partidos': partidos})
  })
});

//DELETE PARTIDO
router.delete('/:_id', (req, res) => {
  let id = req.params._id;
  Partido.findByIdAndRemove(id)
   .then(partidos => {
    if(!partidos){ return res.sendSatatus(401); }
    else{
      Evento.remove({"_id": {"$in" : partidos.eventos}}).then(function(){
          return res.json({'partidos': partidos});
      })
    }
  })
});

module.exports=router;

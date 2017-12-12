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
  var fecha_hoy = new Date();
  var año = fecha_hoy.getFullYear();
  var mes = fecha_hoy.getMonth() + 1;
  var dia = fecha_hoy.getDay();
  var hora = fecha_hoy.getHours();
  var minutos = fecha_hoy.getMinutes();
  var fecha_hoy_str = año + "/" + mes + "/" + dia;
  if(hora > 9){
    if(minutos > 9){
      var horario = hora + ":" + minutos;
    }
    else{
      var horario = hora + ":0" + minutos;
    }
  }
  else{
    if(minutos > 9){
      var horario = "0" + hora + ":" + minutos;
    }
    else{
      var horario = "0" + hora + ":0" + minutos;
    }
  }
  Partido.find({ "fecha_inicio": {$lt: fecha_hoy_str} })
    .then(partidos => {
      console.log(fecha_hoy_str);
      console.log(horario);
      if(!partidos){ return res.sendStatus(401); }
      return res.json({'partidos': partidos})
  })
});


// GET PARTIDO BY ID
router.get('/:_id', (req, res) => {
  let _id = req.params._id;
  Partido.findById(_id)
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
       return res.json({'partido': partido})
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
  let fecha_inicio = req.body.fecha_inicio;
  let hora_inicio = req.body.hora_inicio;
  Partido.findOneAndUpdate({ "_id": _id }, { "$set": { "fecha_inicio": fecha_inicio, "hora_inicio": hora_inicio }})
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

var mongoose = require('mongoose');
var router = require('express').Router();
var bodyParser = require('body-parser');
var Partido = mongoose.model('partido');
var Evento = mongoose.model('evento');

// GET ALL PARTIDOS
router.get('/', (req, res) => {
  Partido.find({})
    .populate('eventos')
    .then(partidos => {
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
  partido = new Partido(req.body);
  partido.save()
    .then(partidos => {
      if(!partidos){ return res.sendStatus(401); }
      return res.json({'partidos': partidos})
  });
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
  let _id = req.params._id;
  Partido.findByIdAndRemove(_id)
   .then(partidos => {
    if(!partidos){ return res.sendStatus(401); }
    return res.json({'partidos': partidos})
  })
});

//DELETE PARTIDO PRUEBA BORRAR PARTIDO Y TODOS SUS EVENTOS
/*router.delete('/:_id', (req, res) => {
  let _id = req.params._id;
  Partido.findByIdAndRemove(_id)
   .then(partidos => {
    console.log(partidos.eventos.length());
    for(let i = 0;i < partidos.eventos.length(); i++)
    {
      var index;
      index = partidos.eventos[i];
      Evento.findByIdAndRemove(index);
    }
    if(!partidos){ return res.sendStatus(401); }
    return res.json({'partidos': partidos})
  })
});
*/

module.exports=router;

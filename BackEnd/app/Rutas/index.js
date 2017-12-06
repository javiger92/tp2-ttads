var router=require('express').Router();

router.use('/api/equipos', require('./equipos'));
router.use('/api/partidos', require('./partidos'));
router.use('/api/eventos', require('./eventos'));

module.exports=router;

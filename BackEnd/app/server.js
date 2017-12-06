var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');

var app            = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/futbol', { useMongoClient: true });
require('./Modelos/partidos.js');
require('./Modelos/equipos.js');
require('./Modelos/eventos.js');

app.use(require('./Rutas'));

var router=express.Router();

app.use(router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});

//defino controlador para el manejo de CRUD 
const espectadorCtrl = require('./../controllers/espectador.controller');

//creamos el manejador de rutas 
const express = require('express'); 
const router = express.Router(); 

//definimos las rutas para la gestion de espectador 

router.get('/', espectadorCtrl.getEspectadores);

router.post('/', espectadorCtrl.createEspectador); 

router.get('/:id', espectadorCtrl.getEspectador); 

router.put('/:id', espectadorCtrl.editEspectador); 

router.delete('/:id', espectadorCtrl.deleteEspectador); 

//exportamos el modulo de rutas module.exports = router;

module.exports = router;
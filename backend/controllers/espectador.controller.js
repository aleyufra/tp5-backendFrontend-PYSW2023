const Espectador = require('../models/espectador');
const espectadorCtrl = {}

espectadorCtrl.getEspectadores = async (req, res) => {
   var espectadores = await Espectador.find();
   res.json(espectadores);
}

espectadorCtrl.createEspectador = async (req, res) => {
   var espectador = new Espectador(req.body);
   try {
      await espectador.save();
      res.json({
         'status': '1',
         'msg': 'Espectador guardado.'
      })
   } catch (error) {
      console.log(error);
      res.status(400).json({
         'status': '0',
         'msg': 'Error procesando operacion.'
      })
   }
}

espectadorCtrl.getEspectador = async (req, res) => {
   const espectador = await Espectador.findById(req.params.id);
   res.json(espectador);
}

espectadorCtrl.editEspectador = async (req, res) => {
   const vespectador = new Espectador(req.body);
   try {
      await Espectador.updateOne({ _id: req.body._id }, vespectador);
      res.json({
         'status': '1',
         'msg': 'Espectador updated'
      })
   } catch (error) {
      console.log(error);
      res.status(400).json({
         'status': '0',
         'msg': 'Error procesando la operacion'
      })
   }
}

espectadorCtrl.deleteEspectador = async (req, res) => {
   try {
      await Espectador.deleteOne({ _id: req.params.id });
      res.json({
         status: '1',
         msg: 'Espectador removed'
      })
   } catch (error) {
      res.status(400).json({
         'status': '0',
         'msg': 'Error procesando la operacion'
      })
   }
}

module.exports = espectadorCtrl;
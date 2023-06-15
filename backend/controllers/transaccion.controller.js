const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}

transaccionCtrl.getTransacciones = async (req, res) => {
   let criteria = {}

   if ((req.query.monedaOrigen != null) && (req.query.monedaOrigen != "") &&
      (req.query.monedaDestino != null) && (req.query.monedaDestino != "") &&
      (req.query.emailCliente != null) && (req.query.emailCliente != "")) {

      criteria.monedaOrigen = req.query.monedaOrigen;
      criteria.monedaDestino = req.query.monedaDestino;
      criteria.emailCliente = req.query.emailCliente;

   } else if ((req.query.monedaOrigen != null) && (req.query.monedaOrigen != "") &&
      (req.query.monedaDestino != null) && (req.query.monedaDestino != "")) {

      criteria.monedaOrigen = req.query.monedaOrigen;
      criteria.monedaDestino = req.query.monedaDestino;

   } else if (req.query.emailCliente != null && req.query.emailCliente != "") {
      
      criteria.emailCliente = req.query.emailCliente
   }

   var transacciones = await Transaccion.find(criteria);
   res.json(transacciones);
}

transaccionCtrl.createTransaccion = async (req, res) => {
   var transaccion = new Transaccion(req.body);
   try {
      await transaccion.save();
      res.json({
         'status': '1',
         'msg': 'Transaccion guardada.'
      })
   } catch (error) {
      console.log(error);
      res.status(400).json({
         'status': '0',
         'msg': 'Error procesando operacion.'
      })
   }
}

transaccionCtrl.getTransaccion = async (req, res) => {
   const transaccion = await Transaccion.findById(req.params.id);
   res.json(transaccion);
}

transaccionCtrl.editTransaccion = async (req, res) => {
   const vtransaccion = new Transaccion(req.body);
   try {
      await Transaccion.updateOne({ _id: req.body._id }, vtransaccion);
      res.json({
         'status': '1',
         'msg': 'Transaccion updated'
      })
   } catch (error) {
      console.log(error);
      res.status(400).json({
         'status': '0',
         'msg': 'Error procesando la operacion'
      })
   }
}

transaccionCtrl.deleteTransaccion = async (req, res) => {
   try {
      await Transaccion.deleteOne({ _id: req.params.id });
      res.json({
         'status': '1',
         'msg': 'Transaccion removed'
      })
   } catch (error) {
      res.status(400).json({
         'status': '0',
         'msg': 'Error procesando la operacion'
      })
   }
}
module.exports = transaccionCtrl;
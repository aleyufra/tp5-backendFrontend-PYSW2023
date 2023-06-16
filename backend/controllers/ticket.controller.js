const Ticket = require('../models/ticket');
const ticketCtrl = {}

ticketCtrl.getTickets = async (req, res) => {
   let criteria = {}
   if ((req.query.categoriaEspectador != null) && (req.query.categoriaEspectador != "")) {
      criteria.categoriaEspectador = req.query.categoriaEspectador
   }
   var tickets = await Ticket.find(criteria).populate('espectador');
   res.json(tickets);
}

ticketCtrl.createTicket = async (req, res) => {
   var ticket = new Ticket(req.body);
   try {
      await ticket.save();
      res.json({
         'status': '1',
         'msg': 'Ticket guardado.',
         'ticket': ticket
      })
   } catch (error) {
      console.log(error);
      res.status(400).json({
         'status': '0',
         'msg': 'Error al guardar el ticket.'
      })
   }
}

ticketCtrl.getTicket = async (req, res) => {
   const ticket = await Ticket.findById(req.params.id).populate('espectador');
   res.json(ticket);
}

ticketCtrl.editTicket = async (req, res) => {
   const vticket = new Ticket(req.body);
   try {
      await Ticket.findOneAndUpdate({ _id: req.body._id }, vticket).populate('espectador');
      res.json({
         'status': '1',
         'msg': 'Ticket actualizado.',
         'ticket': vticket
      })
   } catch (error) {
      console.log(error);
      res.status(400).json({
         'status': '0',
         'msg': 'Error al actualizar el ticket.'
      })
   }
}

ticketCtrl.deleteTicket = async (req, res) => {
   try {
      await Ticket.deleteOne({ _id: req.params.id });
      res.json({
         status: '1',
         msg: 'Ticket eliminado.'
      })
   } catch (error) {
      res.status(400).json({
         'status': '0',
         'msg': 'Error al eliminar el ticket.'
      })
   }
}
module.exports = ticketCtrl;


// await Ticket.updateOne({ _id: req.body._id }, vticket);
//  await Ticket.findOneAndUpdate({ _id: req.body._id }, vticket).populate('espectador');
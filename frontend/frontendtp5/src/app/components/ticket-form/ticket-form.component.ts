import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Espectador } from 'src/app/models/espectador';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {

  precioOriginal: number = 100;
  espectador: Espectador;
  ticket: Ticket

  constructor(private ticketsService: TicketsService, private router: Router) {
    this.espectador = new Espectador;
    this.ticket = new Ticket;
  }

  calcularPrecio(categoria: string): number {
    if (categoria == 'Local') {
      return this.ticket.precioTicket = this.precioOriginal - (this.precioOriginal * 0.20)
    } else if (categoria == 'Extranjero') {
      return this.ticket.precioTicket = this.precioOriginal
    } else {
      return this.ticket.precioTicket = NaN
    }
  }

  async compraTicket(espectador: Espectador) {
    try {
      const crearEspecMsg: string = await new Promise((resolve, reject) => {
        this.ticketsService.postEspectador(espectador).subscribe(
          result => { resolve(result) },
          error => { reject(error) }
        );
      });
      console.log(crearEspecMsg);
      // -------------------------------------
      const ultEspectadorId: any = await this.obtenerUltEspectador();
      console.log(ultEspectadorId);
      this.espectador._id = ultEspectadorId;
      this.ticket.espectador = this.espectador;
      // -------------------------------------
      const crearTicketMsg: string = await new Promise((resolve, reject) => {
        this.ticketsService.postTicket(this.ticket).subscribe(
          result => { resolve(result) },
          error => { reject(error) }
        );
      });
      console.log(crearTicketMsg);
      // --------------------------------------
      this.espectador = new Espectador();
      this.ticket = new Ticket();
    }
    catch (error) {
      console.log(error)
    }
  }

  async obtenerUltEspectador() {
    try {
      const espectadores: any = await new Promise((resolve, reject) => {
        this.ticketsService.getEspectadores().subscribe(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      });
      const ultEspectadorId = espectadores[espectadores.length - 1]._id;
      return ultEspectadorId
    }
    catch (error) {
      console.log(error)
    }
  }

  irAListaDeTickets() {
    this.router.navigate(['ticket-list'])
  }
}

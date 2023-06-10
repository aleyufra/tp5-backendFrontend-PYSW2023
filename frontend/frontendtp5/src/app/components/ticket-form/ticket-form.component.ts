import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Espectador } from 'src/app/models/espectador';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {

  precioOriginal: number = 100;
  espectador: Espectador;
  ticket: Ticket

  edicion: boolean = false;

  constructor(private ticketsService: TicketsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.espectador = new Espectador;
    this.ticket = new Ticket;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != 0) {
        this.ticketsService.getTicket(params['id']).subscribe(
          res => {
            // console.log(res)
            this.espectador = res.espectador;
            this.ticket = res;
            this.edicion = true;
          },
          err => {
            console.log(err)
          }
        )
      }
    })
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
      const crearEspectador: any = await new Promise((resolve, reject) => {
        this.ticketsService.postEspectador(espectador).subscribe(
          result => { resolve(result) },
          error => { reject(error) }
        );
      });
      console.log(crearEspectador.msg);
      // -------------------------------------
      this.espectador = crearEspectador.espectador;
      this.ticket.espectador = this.espectador;
      // -------------------------------------
      const crearTicket: any = await new Promise((resolve, reject) => {
        this.ticketsService.postTicket(this.ticket).subscribe(
          result => { resolve(result) },
          error => { reject(error) }
        );
      });
      console.log(crearTicket.msg); 
      // --------------------------------------
      this.espectador = new Espectador();
      this.ticket = new Ticket();
    }
    catch (error) {
      console.log(error)
    }
  }

  irAListaDeTickets() {
    this.router.navigate(['ticket-list'])
  }

  async editarTicket(ticket: Ticket, espectador: Espectador) {
    try {
      const espectadorEditado: Espectador = await new Promise((resolve, reject) => {
        this.ticketsService.putEspectador(espectador).subscribe(
          res => { resolve(res.espectador) },
          err => { reject(err) }
        )
      });
      console.log(espectadorEditado)

      ticket.espectador = espectadorEditado;

      const ticketEditadoObj = await new Promise((resolve,reject)=> {
        this.ticketsService.putTicket(ticket).subscribe(
          res => {resolve(res)},
          err => {reject(err)}
        )
      });

      // console.log(ticketEditadoObj)
    }
    catch (error) {
      console.log(error)
    }
  }
}

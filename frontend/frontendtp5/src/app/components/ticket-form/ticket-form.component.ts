import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Espectador } from 'src/app/models/espectador';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {

  precioOriginal: number = 600;
  espectador: Espectador;
  ticket: Ticket;

  edicion: boolean = false;

  constructor(private ticketsService: TicketsService, private router: Router, private activatedRoute: ActivatedRoute, private toast: ToastrService) {
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

  // toaster() {
  //   this.toast.success("Se ha registrado correctamente", "Venta de Tckets", {
  //     closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
  //     easeTime: 100
  //   })
  // }

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
      this.toast.success("Se ha registrado correctamente", "Venta de Tckets", {
        closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
        easeTime: 100
      })
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
      const espectadorEditado: any = await new Promise((resolve, reject) => {
        this.ticketsService.putEspectador(espectador).subscribe(
          res => { resolve(res) },
          err => { reject(err) }
        )
      });
      console.log(espectadorEditado.msg)

      ticket.espectador = espectadorEditado;

      const ticketEditado: any = await new Promise((resolve, reject) => {
        this.ticketsService.putTicket(ticket).subscribe(
          res => { resolve(res) },
          err => { reject(err) }
        )
      });
      console.log(ticketEditado.msg);
      this.espectador = new Espectador();
      this.ticket = new Ticket();
      this.toast.info("Se ha modificado con éxito", "Modificacion", {
        closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
        easeTime: 100
      })
    }
    catch (error) {
      console.log(error)
    }
  }
}

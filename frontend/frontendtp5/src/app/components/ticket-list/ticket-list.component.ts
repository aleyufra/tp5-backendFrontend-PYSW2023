import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Espectador } from 'src/app/models/espectador';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets: Array<any>
  categoriaEspectador: string = 'Local';

  constructor(private ticketService: TicketsService, private router: Router, private toast: ToastrService) {
    this.tickets = new Array<Ticket>
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      res => {
        //console.log(res) // array de tickets filtrado o no filtrado por categoria
        this.tickets = res;
      },
      err => { console.log(err) }
    )
  }

  irATicketForm() {
    this.router.navigate(['ticket-form', 0])
  }

  editarTicket(id: string) {
    this.router.navigate(['ticket-form', id])
  }

  obtenerTickets() {
    this.ticketService.getTickets().subscribe(
      res => {
        // console.log(res) // array de tickets
        this.tickets = res;
      },
      err => { console.log(err) }
    )
  }

  filtarTickets(categoria: string) {
    this.ticketService.getTicketsPorCategoria(categoria).subscribe(
      res => {
        // console.log(res) // array de tickets por categoria
        this.tickets = res;
      },
      err => { console.log(err) }
    )
  }

  async eliminarTicket(espectador: Espectador, ticket: Ticket) {
    let result: any;
    try {
      // console.log(espectador);
      result = await new Promise((resolve, reject) => {
        this.ticketService.deleteEspectador(espectador).subscribe(
          res => { resolve(res) },
          err => { reject(err) }
        )
      });
      console.log(result.msg);

      result = await new Promise((resolve, reject) => {
        this.ticketService.deleteTicket(ticket).subscribe(
          res => { resolve(res) },
          err => { reject(err) }
        )
      })
      console.log(result.msg);

      this.toast.error("Se ha eliminado el ticket", "Atencion!!!", {
        closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
        easeTime: 100
      })

      this.ngOnInit();
    }
    catch (error) {
      console.log(error)
    }
  }

}

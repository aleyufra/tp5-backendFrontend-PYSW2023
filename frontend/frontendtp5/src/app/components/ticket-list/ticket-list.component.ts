import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets: Array<any>

  constructor(private ticketService: TicketsService, private router: Router, priate location: Location) {
    this.tickets = new Array<Ticket>
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      res => {
        console.log(res)
        this.tickets = res;
      },
      err => {
        console.log(err)
      }
    )
  }

  editarTicket(id: string) {
    this.router.navigate(['ticket-form', id])
  }

  async eliminarTicket(ticket: Ticket) {
    try {
      let result: any = await new Promise((resolve,reject)=>{
        this.ticketService.deleteEspectador(ticket.espectador).subscribe(
          res => { resolve(res) },
          err => { reject(err) }
        )
      })
      console.log(result.msg)

      result = await new Promise((resolve,reject)=>{
        this.ticketService.deleteTicket(ticket).subscribe(
          res => { resolve(res) },
          err => { reject(err) }
        )
      })
      console.log(result.msg);
      console.log('ticket y espectador han sido borrados')
    }
    catch (error) {
      console.log(error)
    }
  }
}

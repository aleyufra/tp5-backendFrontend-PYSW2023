import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit{

  tickets: Array<any>

  constructor(private ticketService: TicketsService, private router: Router) {
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

}

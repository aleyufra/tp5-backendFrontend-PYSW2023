import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit{

  tickets: Array<any>

  constructor(private ticketService: TicketsService) {
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

}

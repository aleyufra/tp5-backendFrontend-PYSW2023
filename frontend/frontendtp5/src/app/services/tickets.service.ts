import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espectador } from '../models/espectador';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private _http: HttpClient) { }


  // *********** ESPECTADORES ******************


  // GET ESPECTADORES
  getEspectadores(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }

    return this._http.get('http://localhost:3000/api/espectador', httpOptions)
  }


  // POST ESPECTADORES
  postEspectador(espectador: Espectador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    let body = JSON.stringify(espectador)

    return this._http.post('http://localhost:3000/api/espectador', body, httpOptions)
  }


  // PUT ESPECTADOR
  putEspectador(espectador: Espectador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    const body = JSON.stringify(espectador);

    return this._http.put('http://localhost:3000/api/espectador/' + espectador._id, body, httpOptions)
  }


  // DELETE ESPECTADOR
  deleteEspectador(espectador: Espectador) {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this._http.delete('http://localhost:3000/api/espectador/' + espectador._id, httpOptions)
  }


  // --------------------------------------------
  // ***************** TICKETS ******************
  // --------------------------------------------


  // GET TICKETS
  getTickets(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }

    return this._http.get('http://localhost:3000/api/ticket', httpOptions)
  }


  // GET TICKET
  getTicket(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }

    return this._http.get('http://localhost:3000/api/ticket/' + id, httpOptions)
  }


  // GET TICKETS POR CATEGORIA
  getTicketsPorCategoria(categoria: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
        .append('categoriaEspectador', categoria) // params por categoria pasado por parametro
    }

    return this._http.get('http://localhost:3000/api/ticket', httpOptions)
  }


  // POST TICKET
  postTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    let body = JSON.stringify(ticket)

    return this._http.post('http://localhost:3000/api/ticket', body, httpOptions)
  }


  // PUT TICKET
  putTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    const body = JSON.stringify(ticket);

    return this._http.put('http://localhost:3000/api/ticket/' + ticket._id, body, httpOptions)
  }


  // DELETE TICKET
  deleteTicket(ticket: Ticket) {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }

    return this._http.delete('http://localhost:3000/api/ticket/' + ticket._id, httpOptions)
  }

}

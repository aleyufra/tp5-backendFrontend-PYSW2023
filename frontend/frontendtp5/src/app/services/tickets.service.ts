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

  getEspectadores(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    return this._http.get('http://localhost:3000/api/espectador', httpOptions)
  }


  postEspectador(espectador: Espectador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    let body = JSON.stringify(espectador)

    return this._http.post('http://localhost:3000/api/espectador', body, httpOptions)
  }


  putEspectador(espectador: Espectador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    const body = JSON.stringify(espectador);

    return this._http.put('http://localhost:3000/api/espectador/'+espectador._id, body, httpOptions)
  }


  deleteEspectador(espectador: Espectador) {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this._http.delete('http://localhost:3000/api/espectador/'+espectador._id, httpOptions)
  }


  // *********** TICKETS ******************


  getTickets(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
    }
    return this._http.get('http://localhost:3000/api/ticket', httpOptions)
  }


  getTicket(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
    }
    return this._http.get('http://localhost:3000/api/ticket/'+id, httpOptions)
  }


  postTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    let body = JSON.stringify(ticket)

    return this._http.post('http://localhost:3000/api/ticket', body, httpOptions)
  }


  putTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    const body = JSON.stringify(ticket);

    return this._http.put('http://localhost:3000/api/ticket/'+ticket._id, body, httpOptions)
  }


  deleteTicket(ticket: Ticket) {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this._http.delete('http://localhost:3000/api/ticket/'+ticket._id, httpOptions)
  }

}

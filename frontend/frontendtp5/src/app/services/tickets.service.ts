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


  getTickets(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
    }
    return this._http.get('http://localhost:3000/api/ticket', httpOptions)
  }


  postTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" }),
      params: new HttpParams()
    }
    let body = JSON.stringify(ticket)

    return this._http.post('http://localhost:3000/api/ticket', body, httpOptions)
  }


}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor(private _http: HttpClient) { }

  conversor(value: string, from_type: string, to_type: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'cb3248b3e4mshcc7893fea728b6fp1044cejsnda64170dc028',
        'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
      })
    }
    const body = new HttpParams()
      .set('from-value', value)
      .set('from-type', from_type)
      .set('to-type', to_type);
    return this._http.post('https://community-neutrino-currency-conversion.p.rapidapi.com/convert', body, httpOptions);
  }


  getTransacciones(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    return this._http.get('http://localhost:3000/api/transaccion', httpOptions)
  }

  getTransaccionesPorFiltro(morigen: string, mdestino: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
        .append('monedaOrigen', morigen)
          .append('monedaDestino', mdestino)
    }
    return this._http.get('http://localhost:3000/api/transaccion', httpOptions)
  }


  postTransacciones(transaccion: Transaccion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    const body = JSON.stringify(transaccion);

    return this._http.post('http://localhost:3000/api/transaccion', body, httpOptions)
  }
  
}
// cb3248b3e4mshcc7893fea728b6fp1044cejsnda64170dc028
// 00eb449269msh6422ec084d1e376p1f3d32jsn32f6c01e9805
// f2aa6735efmsha8b3b23b3af9952p17cd22jsn48b26a7530eb

// const body = JSON.stringify(producto)
// "Content-type": "application/json"
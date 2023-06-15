import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient) { }


  // GET PRODUCTOS
  getProductos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
    }

    return this._http.get('http://localhost:3000/api/producto', httpOptions)
  }

  
  // GET PRODUCTO
  getProducto(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
    }

    return this._http.get('http://localhost:3000/api/producto/'+id, httpOptions)
  }


  // PRODUCTOS DESTACADOS
  getProductosDestacados(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
        .append('destacado', true)
    }

    return this._http.get('http://localhost:3000/api/producto', httpOptions)
  }


  // POST PRODUCTO
  postProducto(producto: Producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    const body = JSON.stringify(producto)

    return this._http.post('http://localhost:3000/api/producto', body, httpOptions)
  }


  // PUT PRODUCTO
  putProducto(producto: Producto):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    const id = producto._id;
    const body = JSON.stringify(producto)

    return this._http.put('http://localhost:3000/api/producto/'+id, body, httpOptions)
  }


  // DELETE PRODUCTO
  deleteProducto(id: string):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }

    return this._http.delete('http://localhost:3000/api/producto/'+id, httpOptions)
  }
}

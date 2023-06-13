import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient, private toast: ToastrService) { }



  getProductos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
    }

    return this._http.get('http://localhost:3000/api/producto', httpOptions)
  }


  getProducto(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
    }

    return this._http.get('http://localhost:3000/api/producto/'+id, httpOptions)
  }


  getProductosDestacados(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ }),
      params: new HttpParams()
        .append('destacado', true)
    }

    return this._http.get('http://localhost:3000/api/producto', httpOptions)
  }


  postProducto(producto: Producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    const body = JSON.stringify(producto)

    this.toast.success("Se ha agregado el producto con exito", "Atencion:", {
      closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
      easeTime: 100
    })

    return this._http.post('http://localhost:3000/api/producto', body, httpOptions)
  }

  putProducto(producto: Producto):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }
    const id = producto._id;
    const body = JSON.stringify(producto)

    this.toast.info("Se ha modificado el producto", "Atencion:", {
      closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
      easeTime: 100
    })

    return this._http.put('http://localhost:3000/api/producto/'+id, body, httpOptions)
  }

  deleteProducto(id: string):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      params: new HttpParams()
    }

    this.toast.error("Se ha eliminado el producto", "", {
      closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
      easeTime: 100
    })

    return this._http.delete('http://localhost:3000/api/producto/'+id, httpOptions)
  }
}

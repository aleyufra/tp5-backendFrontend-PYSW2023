import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transaccion';
import { ConversorService } from 'src/app/services/conversor.service';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.component.html',
  styleUrls: ['./lista-transacciones.component.css']
})
export class ListaTransaccionesComponent {

  transacciones: Array<any>;
  listaVacia: boolean = true;
  monedaOrigen: string = "USD";
  monedaDestino: string = "ARS";
  mensaje: string = "Aún no se ha cargado la lista . . ."

  constructor(private conversorService: ConversorService, private router: Router) {
    this.transacciones = new Array<Transaccion>();
  }


  obtenerTransacciones() {
    this.mensaje = "Cargando"
    this.conversorService.getTransacciones().subscribe(
      res => {
        // console.log(res); // array de transacciones
        this.transacciones = res;
        this.listaVacia = false;
        this.mensaje = "Aún no se ha cargado la lista . . "
      },
      err => {
        console.log(err)
      }
    )
  }

  obtenerTransaccionesPorFiltro(morigen: string, mdestino: string) {
    this.mensaje = "Cargando"
    this.conversorService.getTransaccionesPorFiltro(morigen, mdestino).subscribe(
      res => {
        // console.log(res); // devuelve array de trans por filtro
        this.transacciones = res;
        if (this.transacciones.length == 0) {
          this.mensaje = 'No se encontraron resultados . . .'
          this.listaVacia = true;
        } else {
          this.listaVacia = false;
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  obtenerEmails() {
    this.conversorService.getTransacciones().subscribe(
      res => {
        // console.log(res) // devuelve mails
        
      },
      err => {
        console.log(err)
      }
    )
  }

}

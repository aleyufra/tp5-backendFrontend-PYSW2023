import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Transaccion } from 'src/app/models/transaccion';
import { ConversorService } from 'src/app/services/conversor.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {

  valor!:number;
  valorDeTipo:string = 'USD';
  valorATipo:string = 'ARS';
  valorATipoMostrar!:string;
  resultado!:string

  transaccion: Transaccion;
  tasaConversion!:number

  constructor(private conversorService: ConversorService, private router: Router, private toast: ToastrService) {
    
    this.transaccion = new Transaccion;
  }

  convertir(valorN: number, deTipo: string, aTipo: string) {

    let valor: string = valorN.toString();

    this.conversorService.conversor(valor,deTipo,aTipo).subscribe(
      res => {
        console.log(res);
        this.valorATipoMostrar = res.to_type;
        this.resultado = res.result;

        this.transaccion.monedaOrigen = this.valorDeTipo;
        this.transaccion.cantidadOrigen = this.valor;
        this.transaccion.monedaDestino = this.valorATipo;
        this.transaccion.cantidadDestino = parseInt(res.result);

        // console.log(JSON.stringify(this.transaccion))
        this.conversorService.postTransacciones(this.transaccion).subscribe(
          res => {
            console.log(res);
            this.toast.warning("Se ha registrado la transaccion", "", {
              closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
              easeTime: 100
            })
          },
          err => {
            console.log(err)
          }
        )
      },

      err => {
        console.log(err)
      }
    )
  }

  goToList() {
    this.router.navigate(['conversor-list'])
  }
}

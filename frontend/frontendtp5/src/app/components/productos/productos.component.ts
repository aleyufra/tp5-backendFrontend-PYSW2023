import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Array<any>;
  prodDest: Array<any>;
  primerProd!: Producto;

  constructor(private productoService: ProductoService, private router: Router, private toast: ToastrService) {

    this.productos = new Array<Producto>();
    this.prodDest = new Array<Producto>();
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      res => {
        // console.log(res)
        this.productos = res;
      },
      err => {
        console.log(err)
      }
    );
    this.productoService.getProductosDestacados().subscribe(
      res => {
        // console.log(res)
        // console.log(this.productos)
        this.prodDest = res;
        this.primerProd = res[0];
        this.prodDest.shift();
      },
      err => { console.log(err) }
    )
  }

  goToProdFormEdit(id: string) {
    this.router.navigate(['productos-form', id])
  }

  goToProdForm(): void {
    this.router.navigate(["productos-form", 0]);
  }

  eliminarProducto(id: string) {
    this.productoService.deleteProducto(id).subscribe(
      res => { 
        console.log(res);
        this.toast.error("Se ha eliminado el producto", "", {
          closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'decreasing',
          easeTime: 100
        })
        this.ngOnInit();
      },
      err => { console.log(err) }
    )
  }
}
